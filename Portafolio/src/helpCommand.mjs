import { AVAILABLE_COMMANDS } from "../main.js";
import { createElement, toPixelsString } from "src/lib.mjs";

/**
 * @param {HTMLElement} resultElement - The HTML Element that will hold all the output generated by this command.
 */
export const renderHelpCommand = (resultElement) => {
  const container = createElement("div")
    .style({
      display: "grid",
      gridTemplateColumns: "35% 45%",
      gridTemplateRows: "1fr",
    })
    .setParent(resultElement);

  /** @type CSSStyleDeclaration */
  const foxElemCommonStyles = {
    gridColumn: "1/2",
    gridRow: "1/2",
    width: "100%",
    aspectRatio: "1/1",
  };

  // Fox animation
  const foxContainer = createElement("div")
    .setProperty("id", "foxContainer")
    .style({
      width: "100%",
      aspectRatio: "1/1",
      display: "grid",
      gridTemplateRows: "1fr",
      gridTemplateColumns: "1fr",
      justifyItems: "center",
      alignItems: "center",
      transition: "all 1s",
    })
    .setParent(container);

  // Backdrop
  createElement("div")
    .style({
      ...foxElemCommonStyles,
      clipPath:
        "polygon(41% 32%, 59% 32%, 84% 1%, 79% 51%, 90% 76%, 50% 99%, 10% 76%, 21% 51%, 16% 1%)",
      backgroundColor: "black",
    })
    .setParent(foxContainer);

  // Fox face
  createElement("div")
    .style({
      ...foxElemCommonStyles,
      clipPath:
        "polygon(40% 37%, 59% 37%, 80% 10%, 74% 51%, 85% 75%, 50% 94%, 15% 75%, 26% 51%, 20% 10%)",
      backgroundColor: "#e86f25",
    })
    .setParent(foxContainer);

  // Fox chin
  createElement("div")
    .style({
      ...foxElemCommonStyles,
      backgroundColor: "white",
      clipPath: "polygon(15% 75%, 33% 70%, 50% 90%, 68% 70%, 85% 75%, 50% 94%)",
    })
    .setParent(foxContainer);

  // Fox Nose
  createElement("div")
    .style({
      ...foxElemCommonStyles,
      backgroundColor: "black",
      clipPath: "polygon(45.8% 85%, 54.8% 85%, 50% 90%)",
    })
    .setParent(foxContainer);

  // Left ear
  createElement("div")
    .style({
      ...foxElemCommonStyles,
      backgroundColor: "black",
      clipPath: "polygon(23% 18%, 30% 48%, 38% 38%)",
    })
    .setParent(foxContainer);

  // Right ear
  createElement("div")
    .style({
      ...foxElemCommonStyles,
      backgroundColor: "black",
      clipPath: "polygon(77% 18%, 70% 48%, 62% 38%)",
    })
    .setParent(foxContainer);

  createElement("div")
    .style({
      ...foxElemCommonStyles,
      backgroundColor: "black",
      clipPath: "polygon(55% 58%, 65% 58%, 65% 60%, 55% 60%)",
    })
    .setProperty("id", "leftEye")
    .setParent(foxContainer);
  createElement("div")
    .style({
      ...foxElemCommonStyles,
      backgroundColor: "black",
      clipPath: "polygon(35% 58%, 45% 58%, 45% 60%, 35% 60%)",
    })
    .setProperty("id", "rightEye")
    .setParent(foxContainer);

  // About Me
  const aboutMeContainer = createElement("div")
    .style({
      display: "flex",
      flexDirection: "column",
    })
    .setParent(container);
  const user = "flavio@galan";
  createElement("p")
    .style({
      fontWeight: "bold",
      color: "#e86f25",
    })
    .addTextNode(user)
    .setParent(aboutMeContainer);
  createElement("p")
    .addTextNode("-".repeat(user.length))
    .setParent(aboutMeContainer);

  const attributes = {
    Description: "Flavio's Portfolio, a never ending student",
    Field: "Mobile and Backend development",
    LastUpdated: new Date(2024, 4, 29).toLocaleDateString(),
  };

  for (const key in attributes) {
    const descriptionContainer = createElement("p").setParent(aboutMeContainer);
    createElement("span")
      .style({
        fontWeight: "bold",
        color: "#e86f25",
        display: "inline-block",
        minWidth: "fitContent",
        width: "11rem",
      })
      .addTextNode(`${key}: `)
      .setParent(descriptionContainer);
    createElement("span")
      .addTextNode(attributes[key])
      .setParent(descriptionContainer);
  }

  const subTitle = "Commands:";
  createElement("p")
    .style({ color: "#e86f25", fontWeight: "bold", paddingTop: "2rem" })
    .addTextNode(subTitle)
    .setParent(aboutMeContainer);
  createElement("p")
    .addTextNode("-".repeat(subTitle.length))
    .setParent(aboutMeContainer);

  for (const key in AVAILABLE_COMMANDS) {
    createElement("p")
      .style({
        paddingLeft: "2rem",
        fontWeight: "bold",
        color: "#e86f25",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      })
      .addTextNode(key)
      .setParent(aboutMeContainer);
    AVAILABLE_COMMANDS[key].usageInfo.forEach((s) =>
      createElement("p")
        .style({
          paddingLeft: "2rem",
        })
        .addTextNode(s)
        .setParent(aboutMeContainer),
    );
  }

  const quoteContainer = createElement("div")
    .style({
      alignSelf: "center",
      padding: "4rem",
      width: "90%",
    })
    .setParent(aboutMeContainer);
  createElement("blockquote")
    .addTextNode(
      "The illiterate of the twenty-first century will not be those who cannot read and write, but those who cannot learn, unlearn, and relearn.",
    )
    .setParent(quoteContainer);
  createElement("p")
    .style({
      paddingTop: "1rem",
    })
    .addTextNode("~ Alvin Toffler")
    .setParent(quoteContainer);
};