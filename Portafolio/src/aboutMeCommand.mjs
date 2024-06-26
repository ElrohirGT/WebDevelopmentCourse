import { createElement } from "./lib.mjs";
import viaje1 from "src/imgs/2_viajeNY1.jpg";
import viaje2 from "src/imgs/3_viajeNY2.jpg";
import esquipulas from "src/imgs/5_esquipulas.jpg";
import rutaDeLosDioses from "src/imgs/4_rutaDeLosDioses.jpg";

/**
 * @param {HTMLElement} resultElement - The HTMLElement that will hold all the output generated by this command.
 */
export const renderAboutMeCommand = (resultElement) => {
  const container = createElement("div")
    .style({
      overflowY: "hidden",
    })
    .setProperty("class", "titleAndTwoColumnsContainer")
    .setParent(resultElement);

  const perCharAnimationDuration = 0.1;
  let animDelay = 0.2;

  const title = "Who am I?";
  createElement("h1")
    .setProperty("class", "titleAndTwoColumnsContainer_title")
    .addAnimatedTextNode(title, {
      delay: animDelay,
      duration: perCharAnimationDuration,
    })
    .setParent(container);
  animDelay += title.length * perCharAnimationDuration;
  animDelay += 0.5;

  const firstColumn = createElement("div").setParent(container);
  const secondColumn = createElement("div").setParent(container);

  const subtitleSec1 = "Life";
  createElement("h2")
    .style({
      fontSize: "3rem",
    })
    .addAnimatedTextNode(subtitleSec1, {
      delay: animDelay,
      duration: perCharAnimationDuration,
    })
    .setParent(firstColumn);
  animDelay += subtitleSec1.length * perCharAnimationDuration;

  const images = [viaje1, viaje2, esquipulas, rutaDeLosDioses];
  const imageAnimDuration = 1;
  images.forEach((imgSource, idx) => {
    createElement("img")
      .style({
        display: "inline-block",
        width: "25%",
        height: "75%",
        objectFit: "cover",
        transform: "translateY(200%)",

        animationName: "SlideIn_Up",
        animationDelay: `${animDelay + idx * 0.5 * imageAnimDuration}s`,
        animationDuration: `${imageAnimDuration}s`,
        animationFillMode: "forwards",
      })
      .setProperty("src", imgSource)
      .setProperty("alt", "Viaje a New York 1")
      .setParent(firstColumn);
  });
  animDelay += imageAnimDuration * images.length * 0.5;
  animDelay += 0.3;

  const subtitleSec2 = "Skills";
  createElement("h2")
    .style({
      fontSize: "3rem",
    })
    .addAnimatedTextNode(subtitleSec2, {
      delay: animDelay,
      duration: perCharAnimationDuration,
    })
    .setParent(secondColumn);
  animDelay += subtitleSec2.length * perCharAnimationDuration;

  const entranceAnimDuration = 0.5;
  const listContainer = createElement("ul")
    .style({
      transform: "translateY(1000%)",
      animationName: "SlideIn_Up",
      animationDelay: `${animDelay + entranceAnimDuration}s`,
      animationDuration: `${entranceAnimDuration}s`,
      animationFillMode: "forwards",
    })
    .setParent(secondColumn);
  const skills = ["Fast learner", "Highly Collaborative", "Solution Oriented"];
  skills.map((s) =>
    createElement("li")
      .style({
        fontSize: "2.2rem",
      })
      .addTextNode(s)
      .setParent(listContainer),
  );
  animDelay += entranceAnimDuration;
  animDelay += 0.3;

  createElement("p")
    .style({
      paddingTop: "1rem",
      fontSize: "2.2rem",
    })
    .addAnimatedTextNode(
      "I'm a CS student from UVG Guatemala, I like sports, nerding around and programming!",
      {
        delay: animDelay,
        duration: perCharAnimationDuration / 2,
      },
    )
    .setParent(secondColumn);
};
