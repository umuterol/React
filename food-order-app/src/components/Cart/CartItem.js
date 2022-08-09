import React from "react";
import MealContext from "../../store/meal-context";
import styles from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <MealContext.Consumer>
      {(ctx) => (
        <li className={styles["cart-item"]}>
          <div>
            <h2>{props.name}</h2>
            <div className={styles.summary}>
              <span className={styles.price}>${props.price}</span>
              <span className={styles.amount}>x {props.quantity}</span>
            </div>
          </div>
          <div className={styles.actions}>
            <button onClick={props.onRemove}>-</button>
            <button onClick={props.onAdd}>+</button>
          </div>
        </li>
      )}
    </MealContext.Consumer>
  );
};

export default CartItem;
