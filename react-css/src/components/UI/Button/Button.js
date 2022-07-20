import React from "react";

import styles from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type}
      className={`${styles.button} ${styles['outline']}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
