import "regenerator-runtime/runtime";

window.WebComponents = window.WebComponents || {};
window.WebComponents.root =
  window.WebComponents.root || `${process.env.ASSETS_PATH}/webcomponentsjs/`;
require("@webcomponents/webcomponentsjs/webcomponents-loader");

WebComponents.waitFor(async () => {
  const { default: MatiButton } = await import("./src/mati-button");
  const { default: MatiFrame } = await import("./src/mati-frame");
  const { default: MatiButtonElement } = await import(
    "./src/mati-button-element"
  );
  customElements.define("mati-button", MatiButton);
  customElements.define("mati-frame", MatiFrame);
  customElements.define("mati-button-element", MatiButtonElement);
  customElements.define(
    "mati-spinner",
    (await import("./src/mati-spinner")).default
  );
});
