import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";

const Overlay = (props) => (
  <>
    <div className={styles.backdrop} onClick={props.onClose}></div>
    <div className={styles.modal}>{props.children}</div>
  </>
);

const Modal = (props) =>
  ReactDOM.createPortal(
    <Overlay {...props} />,
    document.getElementById("cart_modal")
  );

export default Modal;
