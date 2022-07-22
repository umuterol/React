import React from "react";
import "./ErrorModal.css";

function ErrorModal(props) {
  return (
    <div>
      <div className="backdrop" onClick={props.onConfirm} />
      <div className="card modal">
        <header className="header">
          <h2>{props.title}</h2>
        </header>
        <div className="content">
          <p>{props.message}</p>
        </div>
        <footer className="actions-footer">
          <button className="button" onClick={props.onConfirm}>
            Okay
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ErrorModal;
