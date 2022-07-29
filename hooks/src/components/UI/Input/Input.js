import React, { useState, useEffect, useImperativeHandle, useRef } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(null);
  const inputRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      focus: active,
    };
  });

  useEffect(() => {
    props.onSave(value, isValid, props.id);
  }, [value, isValid]);

  const changeHandler = ({ target: { value } }) => {
    let valid = true;
    if (props.email) {
      valid = valid & value.includes("@");
    }
    if (props.min) {
      valid = valid & (value.trim().length >= props.min);
    }
    if (props.max) {
      valid = valid & (value.trim().length <= props.max);
    }
    setValue(value);
    setIsValid(!!valid);
  };

  const active = () => {
    inputRef.current.focus();
  };

  return (
    <div
      className={`${classes.control} ${
        isValid === false ? classes.invalid : ""
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={value}
        onChange={changeHandler}
      />
    </div>
  );
});

export default Input;
