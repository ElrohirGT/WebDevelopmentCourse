import { createElement } from "src/lib";
import "./styles.css";

export function buildSlide() {
  const slide = createElement("section").build();
  const container = createElement("div")
    .setProperty("class", "titleAndTwoColumnsContainer")
    .setParent(slide);

  createElement("h1")
    .setProperty("class", "titleAndTwoColumnsContainer_title")
    .addTextNode("Who am I?")
    .setParent(container);

  createElement("div")
    .setProperty("style", "background-color: red")
    .setParent(container);
  createElement("div")
    .setProperty("style", "background-color: red")
    .setParent(container);

  return slide;
}
