import React, { useContext, useState } from "react";
import MealContext from "../../store/meal-context";
import styles from "./Cart.module.css";

import CartItem from "./CartItem";
import Modal from "../UI/Modal/Modal";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
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

  const orderHandler = () => setIsCheckout(true);

  const submitOrderHandler = (userData) => {
    setIsSubmitting(true);
    fetch(
      "https://react-example-4ba77-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: ctx.cart.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    setTimeout(() => {
      ctx.clearCart();
    }, 1500);
  };

  const ModalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      <button className={styles.button} onClick={orderHandler}>
        Order
      </button>
    </div>
  );

  const modalContent = (
    <>
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
      {isCheckout && (
        <Checkout onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && ModalActions}
    </>
  );

  const isSubmittingModalContent = <p>Sending order data</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
