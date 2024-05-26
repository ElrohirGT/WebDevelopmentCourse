import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import "reveal.js/dist/reveal.css";
import { buildSlide as buildFirstSlide } from "slides/First";
import { buildSlide as buildAboutMeSlide } from "slides/AboutMe";
import "./index.css";
// import "reveal.js/dist/theme/black.css";
import "unfonts.css";

const slidesContainerElement = document.querySelector(".slides");

slidesContainerElement.appendChild(buildFirstSlide());
slidesContainerElement.appendChild(buildAboutMeSlide());

let deck = new Reveal({
  plugins: [Markdown],
});
deck.initialize();
