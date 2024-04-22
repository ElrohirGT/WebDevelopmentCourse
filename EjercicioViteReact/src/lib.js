import { useState } from "react";
/**
 * @typedef {Object} Task
 * @property {string} title
 * @property {string} description
 */

/**
 * React hook that works exactly the same as useState except that it has a localStorage backend.
 * @param {string} key - The key to use to save the item in localStorage.
 * @param {T|null} defaultValue - The value to save in localStorage.
 * @returns {[T, (newValue: T)=> void]}
 */
export function useLocalStorage(key, defaultValue = null) {
  const savedValue = localStorage.getItem(key);
  const savedValueIsNull = savedValue === null;
  const defaultValueIsNotNull = defaultValue !== null;

  if (savedValueIsNull && defaultValueIsNotNull) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }
  const [value, setValue] = useState(localStorage.getItem(key));

  return [
    JSON.parse(value),
    (newValue) => {
      const json = JSON.stringify(newValue);
      localStorage.setItem(key, json);
      setValue(json);
    },
  ];
}
