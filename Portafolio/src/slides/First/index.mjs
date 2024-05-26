import "./styles.css";
import { createElement } from "src/lib";

/**
 * @returns {Element} - The section slide element
 */
export const buildSlide = () => {
  const slide = createElement("section").build();
  const container = createElement("div")
    .setProperty("class", "twoColumnsContainer")
    .setParent(slide);

  // Fox animation
  const foxContainer = createElement("div")
    .setProperty("id", "foxContainer")
    .setParent(container);
  createElement("div")
    .setProperty("id", "foxFaceBackdrop")
    .setParent(foxContainer);
  createElement("div").setProperty("id", "foxFace").setParent(foxContainer);
  createElement("div").setProperty("id", "foxChin").setParent(foxContainer);
  createElement("div").setProperty("id", "foxNose").setParent(foxContainer);
  createElement("div").setProperty("id", "leftEar").setParent(foxContainer);
  createElement("div").setProperty("id", "rightEar").setParent(foxContainer);
  createElement("div").setProperty("id", "leftEye").setParent(foxContainer);
  createElement("div").setProperty("id", "rightEye").setParent(foxContainer);

  // About Me
  const aboutMeContainer = createElement("div")
    .setProperty("id", "aboutMeContainer")
    .setParent(container);
  createElement("h1").addTextNode("Flavio Galán").setParent(aboutMeContainer);
  createElement("h2")
    .addTextNode("Eternal student, mobile and fullstack developer")
    .setParent(aboutMeContainer);
  const quoteContainer = createElement("div")
    .setProperty("id", "quoteContainer")
    .setParent(aboutMeContainer);
  createElement("blockquote")
    .addTextNode(
      "The illiterate of the twenty-first century will not be those who cannot read and write, but those who cannot learn, unlearn, and relearn.",
    )
    .setParent(quoteContainer);
  createElement("p").addTextNode("~ Alvin Toffler").setParent(quoteContainer);

  return slide;
};
