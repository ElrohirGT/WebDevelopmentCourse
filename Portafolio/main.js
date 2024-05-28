import { createElement } from "src/lib.mjs";
import "./index.css";
import "unfonts.css";
import { renderHelpCommand } from "src/helpCommand.mjs";

const DIGITS_AND_LETTERS = "abcdefghijklmnñopqrstuvwxyz"
  .split("")
  .flatMap((c) => [c, c.toLocaleUpperCase()])
  .concat(..."1234567890".split(""));

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
 */

/**
 * @type {HTMLState}
 */
let windowState = createEmptyCommandBlock();

/**
 * @param {HTMLElement} [parent=document.querySelector("body")]
 * @returns {HTMLState} An collection of HTMLElements that represents the most current state of elements to change
 */
function createEmptyCommandBlock(parent = document.querySelector("body")) {
  const commandBlockElem = createElement("div")
    .style({
      display: "flex",
      flexDirection: "column",
    })
    .setParent(parent);
  const commandInputContainer = createElement("div")
    .style({
      display: "flex",
      columnGap: "1rem",
    })
    .setParent(commandBlockElem);
  createElement("p").addTextNode("$").setParent(commandInputContainer);

  const lineElement = createElement("p")
    .style({})
    .setParent(commandInputContainer);
  const resultElement = createElement("div").setParent(commandBlockElem);

  return {
    lineElement,
    resultElement,
  };
}

/**
 * Function that represents a command the user can input
 *
 * @callback TerminalCommand
 * @param {HTMLElement} [resultElement=undefined] resultElement
 * @param {...string} args
 * @returns {void}
 */

const AVAILABLE_COMMANDS = {
  /** @type {TerminalCommand} */
  help: renderHelpCommand,
  /** @type {TerminalCommand} */
  clear: () => {
    document.body.replaceChildren();
  },
};

renderDisplay({ command: "help", args: [] });

/**
 * Keyboard event listener.
 * Should only change values of the state of the application and not window state.
 */
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    console.log("Escape was pressed!");
  } else if (event.key === "Enter") {
    const parts = commandBuffer.split(" ");
    renderDisplay({ command: parts[0], args: parts.slice(1) });
    clearCommandBuffer();
  } else if (event.key === "Backspace" && commandBuffer.length > 0) {
    commandBuffer = commandBuffer.slice(0, commandBuffer.length - 1);
    renderDisplay({ buffer: commandBuffer });
  } else if (event.key === "c" && event.ctrlKey) {
    clearCommandBuffer();
    renderDisplay({ buffer: commandBuffer });
  } else if (event.ctrlKey && event.key === "l") {
    renderDisplay({ command: "clear", args: [] });
    renderDisplay({ buffer: commandBuffer });
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
  }

  if (message.command !== undefined) {
    /** @type ExecuteCommandMessage */
    const { command, args } = message;

    if (AVAILABLE_COMMANDS[command] !== undefined) {
      AVAILABLE_COMMANDS[command](windowState.resultElement, ...args);
    }
    windowState = createEmptyCommandBlock();
  }
}
