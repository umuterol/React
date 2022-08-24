import React, { useEffect, useState } from "react";
import useCounter from "../hooks/use-counter";
import styles from "./Counter.module.css";
import Card from "./Card";

export const Counter = (props) => {
  const [value, setValue] = useState(1);
  const [counter, setCounter, testFn] = useCounter(value);
  const { reset } = props;

  useEffect(() => {
    resetCounterHandler();
  }, [reset]);

  const inputChangeHandler = (event) => {
    const enteredValue = event.target.value.trim();
    const numberValue = +enteredValue;
    setValue(numberValue);
    resetCounterHandler();
  };

  const resetCounterHandler = () => {
    setCounter(0);
  };

  return (
    <Card className={styles.container}>
      <input
        type="number"
        defaultValue="1"
        min="-10"
        max="10"
        step="1"
        onChange={inputChangeHandler}
      />
      <div className={styles["counter-box"]}>
        <span className={styles["counter-text"]}>{counter}</span>
      </div>
      <button className={styles.button} onClick={resetCounterHandler}>
        Reset
      </button>
    </Card>
  );
};
