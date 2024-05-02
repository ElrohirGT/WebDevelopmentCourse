/**
 * Creates a promise that delays for a certain amount of ms.
 * @param {number} ms
 */
export const delay = (ms) => {
  return new Promise((res) => setTimeout(res, ms));
};
