import { document, console } from "global";
import { storiesOf } from "@storybook/html";
import "..";

storiesOf("Mati", module).add("Button", () => {
  const button = document.createElement("mati-button");
  button.setAttribute("client-id", "5cddab27265eee001ba1fb77");
  button.addEventListener("click", e => console.log(e));
  return button;
});
