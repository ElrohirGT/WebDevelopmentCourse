import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import "reveal.js/dist/reveal.css";
import { createElement } from "./lib";
// import "reveal.js/dist/theme/black.css";

const slidesContainerElement = document.querySelector(".slides");

const a = createElement("section")
  .setProperty("value", "I have been created!")
  .build();
slidesContainerElement.appendChild(a);

let deck = new Reveal({
  plugins: [Markdown],
});
deck.initialize();
