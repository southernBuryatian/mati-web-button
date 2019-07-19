import { LitElement, html, css, unsafeCSS } from "lit-element";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import hexToHsl from "hex-to-hsl";
import MatiLogo from "./mati-logo.svg";

const COLOR_MAP = {
  blue: "#3757FF",
  green: "#00B257",
  red: "#EB5757",
  pink: "#FF527E",
  orange: "#F2994A",
  yellow: "#FFBD00"
};

const TRANSLATIONS = {
  en: { verify: "Verify me" },
  es: { verify: "Verifícame" },
  fr: { verify: "Vérifie moi" },
  pt: { verify: "Me confirma" }
};

function isDark(hexColor) {
  const [, , lighness] = hexToHsl(hexColor);
  console.log(lighness);
  return lighness < 70;
}

export default class MatiButton extends LitElement {
  static get properties() {
    return {
      role: { type: String, reflect: true },
      tabindex: { type: Number, reflect: true },
      ariaPressed: { type: String, reflect: true, attribute: "aria-pressed" },
      clientId: { type: String, attribute: "client-id" },
      disabled: { type: Boolean, reflect: true },
      apiHost: { type: String },
      color: { type: String },
      language: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
        align-items: stretch;
        height: 43px;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
        transition: box-shadow 200ms ease-in-out;
        border-radius: 4px;
        outline: 0;
        overflow: hidden;
        font-family: sans-serif;
        font-size: 15px;
        letter-spacing: 0.8px;
        white-space: nowrap;
        user-select: none;
      }

      :host(:not([disabled])) {
        cursor: pointer;
      }

      :host([disabled]) main {
        background: #eee;
        cursor: default;
      }

      :host(:active:not([disabled])) {
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
      }

      figure {
        margin: 0;
        padding: 0 15px;
        background: white;
        display: flex;
        align-items: center;
      }

      figure svg {
        width: 24px;
      }

      main {
        transition: background-color 100ms linear;
        padding: 0 40px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
  }

  constructor() {
    super();
    this.role = "button";
    this.tabindex = 0;
    this.ariaPressed = "false";
    this.disabled = true;
    this.apiHost = "https://api.stage.getmati.com";
    this.signupHost = "https://signup.staging.getmati.com";
    this.color = COLOR_MAP.blue;
    const [lang] = navigator.language.split("-");
    this.texts = TRANSLATIONS[lang || en];

    this.addEventListener("click", this.openIframe);
    window.addEventListener("message", this.handleFrameMessages.bind(this));
  }

  handleFrameMessages({ origin, data }) {
    console.log([origin, this.signupHost]);
    if (origin !== this.signupHost) {
      return;
    }

    try {
      const { action, payload } = JSON.parse(data);

      const [, actionName] = action.split("::");
      console.log(actionName);

      switch (actionName) {
        case "loaded":
          this.disabled = false;
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
    this.removeFrame();
    const frame = document.createElement("mati-frame");
    frame.setAttribute("signup-host", this.signupHost);
    frame.setAttribute("client-id", this.clientId);
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
      this.color = COLOR_MAP[color] || color;
      this.disabled = false;
    } catch (e) {
      console.error("Mati: unable to read data for the client");
    }
  }

  render() {
    return html`
      <style>
        main {
          color: ${unsafeCSS(isDark(this.color) ? "white" : "black")};
          background-color: ${unsafeCSS(this.color)};
        }
      </style>
      <figure>${unsafeHTML(MatiLogo)}</figure>
      <main>${this.texts.verify}</main>
    `;
  }
}
