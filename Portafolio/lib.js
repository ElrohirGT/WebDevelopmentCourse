/**
 * @typedef {Object} HTMLBuilder
 * @property {()=>Element} build - Constructs the HTML node element.
 * @property {(propertyName: string, propertyValue: string)=>HTMLBuilder} setProperty - Sets a property inside an HTML element
 * @property {(parent: Element)=>Element} setParent - Adds the element as a child of the supplied DOM element and constructs it.
 * @property {(text: string)=>HTMLBuilder} addTextNode - Adds a text node to the HTML element.
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
    setParent: (parent) => {
      parent.appendChild(nativeElem);
      return wrapper.build();
    },
    addTextNode: (text) => {
      const textNode = document.createTextNode(text);
      nativeElem.appendChild(textNode);
      return wrapper;
    },
    build: () => nativeElem,
  };
  return wrapper;
};
