/**
 * @template T
 * @typedef {Object} SuspenseResource
 * @property {() => T} read
 */

/**
 * Function used to wrap a promise for use with suspense.
 * If you want to use the `SuspenseResource` returned by this function please do so according to:
 * https://blog.logrocket.com/data-fetching-react-suspense/
 * @template T
 * @param {Promise<T>} promise - The promise to wrap in order to use suspense
 * @returns {SuspenseResource<T>} - The promise wrapped in an API thats compatible with suspense.
 */
export default function WrapPromise(promise) {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (error) => {
      status = "error";
      response = error;
    },
  );

  const read = () => {
    if (status === "pending") {
      throw suspender;
    } else if (status === "error") {
      throw response;
    } else {
      return response;
    }
  };

  return { read };
}
