import React, { useContext } from "react";
import MealContext from "../../store/meal-context";
import styles from "./Cart.module.css";

import CartItem from "./CartItem";
import Modal from "../UI/Modal/Modal";

const Cart = (props) => {
  const ctx = useContext(MealContext);

  const cartItemAddHandler = (item) => {
    ctx.addCart({
      ...item,
      quantity: 1,
    });
  };

  const cartItemRemoveHandler = (id) => {
    ctx.removeCart(id);
  };

  return (
    <Modal onClose={props.onClose}>
      <ul className={styles["cart-items"]}>
        {ctx.cart.items.map((item) => (
          <CartItem
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        ))}
      </ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>${ctx.cart.totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
