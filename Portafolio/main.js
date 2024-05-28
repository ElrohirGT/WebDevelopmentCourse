import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";
import "reveal.js/dist/reveal.css";
import { buildSlide as buildFirstSlide } from "src/slides/First/index.mjs";
import { buildSlide as buildAboutMeSlide } from "src/slides/AboutMe/index.mjs";
import { buildSlide as buildProductionExperienceSlide } from "src/slides/ProductionExperience/index.mjs";
import "./index.css";
// import "reveal.js/dist/theme/black.css";
import "unfonts.css";

const slidesContainerElement = document.querySelector(".slides");

slidesContainerElement.appendChild(buildFirstSlide());
slidesContainerElement.appendChild(buildAboutMeSlide());
slidesContainerElement.appendChild(buildProductionExperienceSlide());

let deck = new Reveal({
  plugins: [Markdown],
});
deck.initialize();
