import { useState } from "react";

/**
 * A useState react hook that uses internally localStorage to save its state.
 * @param {string} key - The key to save this object into
 * @param {T|undefined} defaultValue - The default value to save inside local storage.
 * @returns {[T, (newValue: T)=>void]} The custom react hook.
 */
export const useLocalStorage = (key, defaultValue = undefined) => {
  localStorage.setItem(key, JSON.stringify(defaultValue));
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(key)));

  return [
    value,
    (newValue) => {
      const newValueJson = JSON.stringify(newValue);
      localStorage.setItem(newValueJson);
      setValue(newValue);
    },
  ];
};
