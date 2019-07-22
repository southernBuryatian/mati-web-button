import { html as litHtml, render } from "lit-html";
export function html(...args) {
  const element = document.createElement("div");
  render(litHtml.apply(null, args), element);
  return element;
}
