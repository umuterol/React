import React, { useEffect, useReducer, useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

const initialState = {
  value: {
    email: "",
    password: "",
  },
  inputIsValid: {
    email: null,
    password: null,
  },
  formIsValid: null,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "ENTRY":
      const updatedState = {
        value: {
          ...state.value,
          [action.key]: action.value,
        },
        inputIsValid: {
          ...state.inputIsValid,
          [action.key]: action.valid,
        },
      };

      return {
        ...updatedState,
        formIsValid:
          updatedState.inputIsValid.password && updatedState.inputIsValid.email,
      };
  }
  return state;
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);

  const [formState, dispatch] = useReducer(formReducer, initialState);
  const ctx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    console.log("EFFECT RUNNING");

    return () => {
      console.log("EFFECT CLEANUP");
    };
  }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log('Checking form validity!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );
  //   }, 500);

  //   return () => {
  //     console.log('CLEANUP');
  //     clearTimeout(identifier);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const inputSaveHandler = (value, valid, key) => {
    dispatch({
      type: "ENTRY",
      key,
      value,
      valid,
    });
  };

  // const emailChangeHandler = (event) => {
  //   dispatch({
  //     type: "ENTRY",
  //     key: "email",
  //     value: event.target.value,
  //     valid: event.target.value.trim().includes("@"),
  //   });
  // };

  const passwordChangeHandler = (event) => {
    dispatch({
      type: "ENTRY",
      key: "password",
      value: event.target.value,
      valid: event.target.value.trim().length > 6,
    });
    // setEnteredPassword(event.target.value);
    // setFormIsValid(
    //   enteredEmail.includes("@") && event.target.value.trim().length > 6
    // );
  };

  // const validateEmailHandler = () => {
  //   // setEmailIsValid(enteredEmail.includes("@"));
  // };

  // const validatePasswordHandler = () => {
  //   setPasswordIsValid(enteredPassword.trim().length > 6);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formState.formIsValid) {
      ctx.onLogin(formState.value.email, formState.value.password);
    } else if (!formState.inputIsValid.email) {
      emailRef.current.focus();
    } else {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          label="Email"
          type="email"
          id="email"
          onSave={inputSaveHandler}
          email
          min={5}
          max={25}
        />
        <Input
          ref={passwordRef}
          label="Password"
          type="password"
          id="password"
          onSave={inputSaveHandler}
          min={6}
          max={15}
        />
        {/* <div
          className={`${classes.control} ${
            formState.inputIsValid.password === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formState.value.password}
            onChange={passwordChangeHandler}
            // onBlur={validatePasswordHandler}
          />
        </div> */}
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
