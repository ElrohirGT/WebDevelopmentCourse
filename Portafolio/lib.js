/**
 * @typedef {Object} HTMLBuilder
 * @property {()=>Element} build
 * @property {(propertyName: string, propertyValue: string)=>HTMLBuilder} setProperty - Sets a property inside an HTML element
 */

/**
 * Builder for an HTMLElement.
 * @param {string} tag - The HTML tag to create an element of.
 * @returns {HTMLBuilder} An HTMLElement builder
 */
export const createElement = (tag) => {
  const nativeElem = document.createElement(tag);
  const wrapper = {
    setProperty: (propertyName, propertyValue) => {
      nativeElem.setAttribute(propertyName, propertyValue);
      return wrapper;
    },
    build: () => nativeElem,
  };
  return wrapper;
};
