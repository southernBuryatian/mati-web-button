import { LitElement, html, css } from "lit-element";

export default class MatiFrame extends LitElement {
  static get properties() {
    return {
      clientId: { type: String, attribute: "client-id" },
      disabled: { type: Boolean, reflect: true },
      signupHost: { type: String, attribute: "signup-host" },
      metadata: { type: String }
    };
  }

  static get styles() {
    return css`
      iframe {
        z-index: 2147483647;
        background: rgba(0, 0, 0, 0.004);
        border: 0px none transparent;
        overflow: hidden auto;
        visibility: visible;
        margin: 0px;
        padding: 0px;
        position: fixed;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        -webkit-tap-highlight-color: transparent;
      }
    `;
  }

  render() {
    const url = `${this.signupHost}/?merchantToken=${this.clientId}`;
    return html`
      <iframe
        @message="${this.handleMessages}"
        frameborder="0"
        allowtransparency
        src="${url}"
        allow="geolocation; microphone; camera; midi; encrypted-media;"
      ></iframe>
    `;
  }
}
