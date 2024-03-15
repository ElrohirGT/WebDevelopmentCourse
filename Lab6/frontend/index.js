console.log("Defining API config...");
const API_BASE_URL = "http://localhost:3000";

console.log("Error logging...");
/**
 * Creates a function that logs an error object and appends a specified message.
 * @param {string} message The message to append to the log
 * @returns {Function} With a signature equivalent to `console.error`
 */
const logError = (message) => {
  return (obj) => {
    console.error(message, obj);
  };
};

console.log("Before render...");
ReactDOM.render(<MainComponent />, document.getElementById("root"));
console.log("After render...");
