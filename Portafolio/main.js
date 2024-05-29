import { createElement } from "src/lib.mjs";
import "./index.css";
import "unfonts.css";
import { renderHelpCommand } from "src/helpCommand.mjs";
import { renderAboutMeCommand } from "src/aboutMeCommand.mjs";
import { renderExperienceCommand } from "src/experienceCommand.mjs";

const DIGITS_AND_LETTERS = "abcdefghijklmnñopqrstuvwxyz"
  .split("")
  .flatMap((c) => [c, c.toLocaleUpperCase()])
  .concat(..."1234567890 ".split(""));

console.log(DIGITS_AND_LETTERS);

/** @type string[] */
let commandHistory = [];
let commandBuffer = "";

/** Clears the command buffer from any input */
function clearCommandBuffer() {
  commandBuffer = "";
}

/**
 * @typedef {Object} HTMLState
 * @property {HTMLElement} lineElement
 * @property {HTMLElement} resultElement
 * @property {HTMLElement} cursorElement
 */

let windowState = createEmptyCommandBlock();

/**
 * @param {HTMLElement} [parent=document.querySelector("body")]
 * @returns {HTMLState} An collection of HTMLElements that represents the most current state of elements to change
 */
function createEmptyCommandBlock(parent = document.querySelector("body")) {
  const animatableCursorStyles = {
    animation: "1.1s linear 0s infinite alternate both running CursorBlink",
    backgroundColor: "#e86f25",
    width: ".8rem",
    height: "1.5rem",
  };

  const commandBlockElem = createElement("div")
    .style({
      display: "flex",
      flexDirection: "column",
    })
    .setParent(parent);
  const commandInputContainer = createElement("div")
    .style({
      display: "flex",
    })
    .setParent(commandBlockElem);
  createElement("p")
    .style({
      color: "#e86f25",
      fontWeight: "bold",
      paddingRight: "1rem",
    })
    .addTextNode("$")
    .setParent(commandInputContainer);

  const lineElement = createElement("p").setParent(commandInputContainer);
  const cursorElement = createElement("span")
    .style(animatableCursorStyles)
    .setParent(commandInputContainer);
  const resultElement = createElement("div").setParent(commandBlockElem);

  return {
    lineElement,
    resultElement,
    cursorElement,
  };
}

/**
 * Function that represents a command the user can input
 *
 * @callback TerminalCommandLambda
 * @param {HTMLElement} [resultElement=undefined] resultElement
 * @param {...string} args
 * @returns {void}
 */

/**
 * A command that can be run inside the terminal emulator
 *
 * @typedef {Object} TerminalCommand
 * @property {TerminalCommandLambda} function
 * @property {string[]} usageInfo
 */

export const AVAILABLE_COMMANDS = {
  /** @type {TerminalCommandLambda} */
  help: {
    function: renderHelpCommand,
    usageInfo: ["Usage: help", "Displays this command block again."],
  },
  /** @type {TerminalCommandLambda} */
  clear: {
    function: () => {
      document.body.replaceChildren();
    },
    usageInfo: ["Usage: clear", "Clears the console."],
  },
  /**@type {TerminalCommandLambda}*/
  aboutMe: {
    function: renderAboutMeCommand,
    usageInfo: [
      "Usage: aboutMe",
      "Displays some extra information about who I am.",
    ],
  },
  /**@type {TerminalCommandLambda}*/
  experience: {
    function: renderExperienceCommand,
    usageInfo: [
      "Usage: experience",
      "Displays information regarding my experience in the industry.",
    ],
  },
};

renderDisplay({ command: "help", args: [] });

/**
 * Keyboard event listener.
 * Should only change values of the state of the application and not window state.
 */
document.addEventListener("keydown", (event) => {
  // Escape to return to normal mode
  if (event.key === "Escape") {
    console.log("Escape was pressed!");

    // Press enter to execute a command
  } else if (event.key === "Enter") {
    const parts = commandBuffer.split(" ");
    renderDisplay({ command: parts[0], args: parts.slice(1) });
    clearCommandBuffer();

    // Press backspace to delete a character
  } else if (event.key === "Backspace" && commandBuffer.length > 0) {
    commandBuffer = commandBuffer.slice(0, commandBuffer.length - 1);
    renderDisplay({ buffer: commandBuffer });

    // Press CTRL-C to delete current command
  } else if (event.key === "c" && event.ctrlKey) {
    clearCommandBuffer();
    renderDisplay({ buffer: commandBuffer });

    // Press CTRL-L to clear screen
  } else if (event.ctrlKey && event.key === "l") {
    renderDisplay({ command: "clear", args: [] });
    renderDisplay({ buffer: commandBuffer });

    // Press any other key to input to buffer
  } else if (DIGITS_AND_LETTERS.includes(event.key)) {
    commandBuffer += event.key;
    renderDisplay({ buffer: commandBuffer });
  }
});

/**
 * @typedef {Object} InputMessage
 * @property {string} buffer
 */
/**
 * @typedef {Object} ExecuteCommandMessage
 * @property {string} command
 * @property {string[]} args
 */

/**
 * @typedef {InputMessage|ExecuteCommandMessage} Message
 */

/**
 * @typedef {Object} State
 * @property {string} commandBuffer
 */

/**
 * Renders the terminal interface according to the state supplied.
 * Should only change window state and not application state.
 * @param {Message} message
 */
function renderDisplay(message) {
  console.log("Rendering message: ", message);
  if (message.buffer !== undefined) {
    /** @type InputMessage */
    const { buffer } = message;
    windowState.lineElement.textContent = buffer;

    const scrollOptions = {
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    };
    window.scrollBy(scrollOptions);
  }

  if (message.command !== undefined) {
    /** @type ExecuteCommandMessage */
    const { command, args } = message;

    if (AVAILABLE_COMMANDS[command] !== undefined) {
      AVAILABLE_COMMANDS[command].function(windowState.resultElement, ...args);
    } else {
      createElement("p")
        .addTextNode(
          `Unknown command: \`${command}\`. Type \`help\` to get a list of all the available commands`,
        )
        .setParent(windowState.resultElement);
    }
    windowState.cursorElement.remove();
    windowState = createEmptyCommandBlock();

    const scrollOptions = {
      left: 0,
      top: document.body.scrollHeight,
      behavior: "smooth",
    };
    window.scrollBy(scrollOptions);
  }
}
