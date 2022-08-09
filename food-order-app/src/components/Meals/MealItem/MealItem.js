import React, { useContext } from "react";
import MealContext from "../../../store/meal-context";
import styles from "./MealItem.module.css";

import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const ctx = useContext(MealContext);

  const addCartHandler = (quantity) => {
    ctx.addCart({
      id: props.id,
      name: props.name,
      price: props.price,
      quantity: quantity,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={styles.description}>{props.description}</div>
        <div className={styles.price}>${props.price}</div>
      </div>
      <MealItemForm mealId={props.id} onAddToCart={addCartHandler} />
    </li>
  );
};

export default MealItem;
