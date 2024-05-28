import { createElement } from "src/lib";
import viaje1 from "src/imgs/viajeNY1.jpg";
import viaje2 from "src/imgs/viajeNY2.jpg";
import esquipulas from "src/imgs/esquipulas.jpg";
import rutaDeLosDioses from "src/imgs/rutaDeLosDioses.jpg";

/**
 * @returns {HTMLElement} The built slide
 */
export function buildSlide() {
  const slide = createElement("section").build();
  const container = createElement("div")
    .setProperty("class", "titleAndTwoColumnsContainer")
    .setParent(slide);

  createElement("h1")
    .setProperty("class", "titleAndTwoColumnsContainer_title")
    .addTextNode("Who am I?")
    .setParent(container);

  const secondColumn = createElement("div").setParent(container);
  const firstColumn = createElement("div").setParent(container);

  createElement("h2").addTextNode("Skills").setParent(firstColumn);
  const listContainer = createElement("ul").setParent(firstColumn);
  const skills = ["Fast learner", "Collaborative", "Solution Oriented"];
  skills.map((s) =>
    createElement("li").addTextNode(s).setParent(listContainer),
  );

  createElement("h2").addTextNode("Life").setParent(secondColumn);
  const images = [viaje1, viaje2, esquipulas, rutaDeLosDioses];
  images.forEach((imgSource) => {
    createElement("img")
      .style({
        width: "10vw",
        height: "20vh",
        objectFit: "cover",
      })
      .setProperty("src", imgSource)
      .setProperty("alt", "Viaje a New York 1")
      .setParent(secondColumn);
  });

  return slide;
}
