import React, { useState, useRef } from "react";
import MealContext from "../../../store/meal-context";
import Input from "../../UI/Input/Input";

import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmount < 1 ||
      enteredAmount > 5
    ) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    props.onAddToCart(enteredAmountNumber);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: `amount_${props.mealId}`,
          type: "number",
          required: true,
          defaultValue: "1",
          min: "1",
          max: "5",
          step: "1",
        }}
      />
      <button>+ Add</button>
      {isValid || <p>Please enter valid input</p>}
    </form>
  );
};

export default MealItemForm;
