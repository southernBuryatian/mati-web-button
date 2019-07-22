import { LitElement, html, css, unsafeCSS } from "lit-element";
import hexToHsl from "hex-to-hsl";

export default class MatiButton extends LitElement {
  static get properties() {
    return {
      clientId: { type: String },
      apiHost: { type: String },
      signupHost: { type: String },
      disabled: { type: Boolean },
      loading: { type: Boolean },
      color: { type: String },
      language: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
    `;
  }

  constructor() {
    super();
    this.disabled = true;
    this.loading = true;
    this.apiHost = "https://api.getmati.com";
    this.signupHost = "https://signup.getmati.com";
    [this.language] = navigator.language.split("-");

    this.addEventListener("click", this.openIframe);
    window.addEventListener("message", this.handleFrameMessages.bind(this));
  }

  handleFrameMessages({ origin, data }) {
    if (origin !== this.signupHost) {
      return;
    }

    try {
      const { action, payload } = JSON.parse(data);
      const [, actionName] = action.split("::");

      switch (actionName) {
        case "loaded":
          this.disabled = false;
          this.loading = false;
          break;
        case "exitedSdk":
          this.removeFrame();
          break;
        default:
      }
    } catch (e) {
      console.error(e);
      console.error("Mati: unable to read info from mati popup");
    }
  }

  removeFrame() {
    const oldIframe = document.querySelector("mati-frame");
    if (oldIframe) {
      oldIframe.remove();
    }
  }

  openIframe() {
    this.disabled = true;
    this.loading = true;
    this.removeFrame();
    const frame = document.createElement("mati-frame");
    frame.setAttribute("signuphost", this.signupHost);
    frame.setAttribute("clientid", this.clientId);
    frame.setAttribute("metadata", this.metadata);
    window.document.body.appendChild(frame);
  }

  async firstUpdated() {
    const api = `${this.apiHost}/api/v1/merchants/me`;
    const headers = {
      authorization: `Bearer ${this.clientId}`
    };
    try {
      const response = await fetch(api, { headers });
      const {
        configurations: {
          style: { color }
        }
      } = await response.json();
      this.color = color;
      this.disabled = false;
      this.loading = false;
    } catch (e) {
      console.error("Mati: unable to read data for the client");
    }
  }

  render() {
    return html`
      <mati-button-element
        ?disabled="${this.disabled}"
        ?loading="${this.loading}"
        color="${this.color}"
        language="${this.language}"
      ></mati-button-element>
    `;
  }
}
