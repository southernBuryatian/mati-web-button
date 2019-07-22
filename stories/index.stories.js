import { document } from "global";
import { storiesOf } from "@storybook/html";
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs";
import { html } from "./helpers";
import "..";

const stories = storiesOf("Mati", module);
stories.addDecorator(withKnobs);

stories.add("Button", () => {
  const button = document.createElement("mati-button");
  button.setAttribute(
    "clientid",
    text("Client ID", process.env.STORYBOOK_CLIENT_ID)
  );
  button.setAttribute(
    "apihost",
    text("API Host", process.env.STORYBOOK_API_HOST)
  );
  button.setAttribute(
    "signuphost",
    text("Signup Host", process.env.STORYBOOK_SIGNUP_HOST)
  );
  return button;
});

stories.add(
  "Button Element",
  () => html`
    <mati-button-element
      ?disabled="${boolean("Disabled", false)}"
      ?loading="${boolean("Loading", false)}"
      color="${select(
        "Color",
        {
          Blue: "blue",
          Green: "green",
          Red: "red",
          Pink: "pink",
          Orange: "orange",
          Yellow: "yellow"
        },
        "blue"
      )}"
      language="${select(
        "Language",
        {
          English: "en",
          French: "fr",
          Spanish: "es",
          Portuguese: "pt"
        },
        "en"
      )}"
    ></mati-button-element>
  `
);

stories.add(
  "Spinner",
  () =>
    html`
      <mati-spinner style="background: #efefef" />
    `
);
