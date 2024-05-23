import "./styles.css";
import { createElement } from "../../lib";

/**
 * @returns {Element} - The section slide element
 */
export const buildSlide = () => {
  const slide = createElement("section").build();
  const container = createElement("div")
    .setProperty("class", "container")
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
  const title = createElement("h1")
    .addTextNode("Flavio Galán")
    .setParent(container);
  return slide;
};
