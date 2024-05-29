import { createElement } from "src/lib.mjs";
import linkIcon from "@tabler/icons/outline/link.svg";
import exeboardBanner from "src/imgs/exeboardHome.png";
import exploraxBanner from "src/imgs/exploraxHome.png";

export const renderExperienceCommand = (resultElement) => {
  const container = createElement("div")
    .style({
      display: "grid",
      gridTemplateColumns: "50% 50%",
      gridTemplateRows: "auto",
      gridTemplateAreas: '"title title"',
      gap: "1rem",
    })
    .setParent(resultElement);

  /** @type CSSStyleDeclaration */
  const slideStyles = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "80% 10%",
    gridTemplateAreas: `
		"banner banner"
		"title description"
		`,
    alignItems: "center",
    gap: "1rem",
  };

  const perCharAnimationDuration = 0.1;
  let delay = 0.2;

  const subSlide1 = createElement("section")
    .style({
      gridArea: "title",
    })
    .setParent(container);

  const title = "Experience in Production";
  createElement("h1")
    .addAnimatedTextNode(title, {
      delay,
      duration: perCharAnimationDuration,
    })
    .setParent(subSlide1);
  delay += (perCharAnimationDuration * title.length * 3) / 4;

  /** @type {{banner: string, title: string, description: string[], link: string}[]} */
  const slidesData = [
    {
      banner: exeboardBanner,
      title: "Exeboard",
      link: "https://www.exeboard.com/",
      description: [
        "Started working as a mobile developer in react native.",
        "Currently implementing a backend with microservices using Go and Kubernetes.",
      ],
    },
    {
      banner: exploraxBanner,
      title: "ExploraX",
      link: "https://www.explorax.app/",
      description: [
        "Worked as a developer for the mobile application built in Expo and the desktop app built with electron.",
      ],
    },
  ];

  const entranceAnimDuration = 1;
  slidesData.forEach((slideData, idx) => {
    const animationProperties =
      idx % 2 === 0
        ? {
            transform: "translateX(-1000%)",
            animationName: "SlideIn_Left",
            animationDelay: `${delay + entranceAnimDuration}s`,
            animationDuration: `${entranceAnimDuration}s`,
            animationFillMode: "forwards",
          }
        : {
            transform: "translateX(1000%)",
            animationName: "SlideIn_Right",
            animationDelay: `${delay + entranceAnimDuration}s`,
            animationDuration: `${entranceAnimDuration}s`,
            animationFillMode: "forwards",
          };
    const subSlide = createElement("div")
      .style({ overflowX: "hidden" })
      .setParent(container);

    const exeboardLink = createElement("a")
      .style({ ...slideStyles, ...animationProperties, textDecoration: "none" })
      .setProperty("href", slideData.link)
      .setProperty("target", "_blank")
      .setParent(subSlide);
    createElement("img")
      .style({
        width: "100%",
        gridArea: "banner",
      })
      .setProperty("src", slideData.banner)
      .setParent(exeboardLink);
    const titleElem = createElement("h2")
      .style({
        display: "inline-block",
        color: "#42affa",
      })
      .addTextNode(slideData.title)
      .setParent(exeboardLink);
    createElement("img")
      .style({
        height: "1.5rem",
        filter: "invert(.5) sepia(1) saturate(5) hue-rotate(175deg)",
      })
      .setProperty("src", linkIcon)
      .setParent(titleElem);

    const descriptionContainer = createElement("div").setParent(exeboardLink);
    slideData.description.forEach((desc) => {
      createElement("p").addTextNode(desc).setParent(descriptionContainer);
    });
  });
};
