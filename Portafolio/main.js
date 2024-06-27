import { createElement, delay } from "src/lib.mjs";
import "./index.css";
import "unfonts.css";


createElement("a").setProperty("href", "https://elrohirgt.github.io/").addAnimatedTextNode("Checkout the new improved portfolio!", {
  delay: 0,
  duration: 1 / 100
}, {
  textDecoration: "underline white"
}).style({
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}).setParent(document.body);