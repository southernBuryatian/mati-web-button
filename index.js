import "regenerator-runtime/runtime";

window.WebComponents = window.WebComponents || {};
window.WebComponents.root = "/webcomponentsjs/";
require("@webcomponents/webcomponentsjs/webcomponents-loader");

WebComponents.waitFor(async () => {
  const { default: MatiButton } = await import("./src/mati-button");
  const { default: MatiFrame } = await import("./src/mati-frame");
  customElements.define("mati-button", MatiButton);
  customElements.define("mati-frame", MatiFrame);
});
