/**
 * Promise that awaits a certain amount of milliseconds before continuing.
 * @param {number} ms - Milliseconds to wait
 */
export async function wait(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
