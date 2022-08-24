import { useState, useEffect } from "react";

const useCounter = (number) => {
  const [counter, setCounter] = useState();
  useEffect(() => {
    // setCounter(0);
    console.log(number);
    const counterInterval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + number);
    }, 1000);

    return () => {
      clearInterval(counterInterval);
      console.log(`${number} silindi.`);
    };
  }, [number]);
  const testFn = () => {};
  return [counter, setCounter, testFn];
};

export default useCounter;
