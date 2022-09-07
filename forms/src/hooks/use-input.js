import { useState } from "react";

const useInput = (callback) => {
  const [value, setValue] = useState("");
  const [isBlur, setIsBlur] = useState(false);
  const isValid = callback(value);
  const hasError = !isValid && isBlur;

  const valueChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const blurHandler = () => {
    setIsBlur(true);
  };

  const reset = () => {
    setValue("");
    setIsBlur(false);
  };

  return {
    value,
    isBlur,
    isValid,
    hasError,
    valueChangeHandler,
    blurHandler,
    reset,
  };
};

export default useInput;
