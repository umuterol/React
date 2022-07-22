import React, { useState } from "react";
import ErrorModal from "./ErrorModal";
import "./Form.css";

function Form(props) {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const changeUsernameHandler = ({ target: { value } }) => {
    setEnteredUsername(value);
  };

  const changeAgeHandler = ({ target: { value } }) => {
    setEnteredAge(value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.length === 0) {
      setError({
        title: "Invalid input",
        message: "Plase enter a valid name and age (non-empty values).",
      });
      return;
    }
    props.saveUser({
      username: enteredUsername,
      age: enteredAge,
    });
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={() => setError(null)}
        />
      )}
      <form className="form" onSubmit={submitHandler}>
        <div className="form-controls">
          <div className="form-control">
            <label className="form-control__label">Username</label>
            <input
              value={enteredUsername}
              type="text"
              className="form-control__input"
              onChange={changeUsernameHandler}
            />
          </div>
          <div className="form-control">
            <label className="form-control__label">Age(Years)</label>
            <input
              type="number"
              min={0}
              max={150}
              className="form-control__input"
              step={1}
              value={enteredAge}
              onChange={changeAgeHandler}
            />
          </div>
        </div>
        <footer>
          <button className="actions" type="submit">
            Add User
          </button>
        </footer>
      </form>
    </div>
  );
}

export default Form;
