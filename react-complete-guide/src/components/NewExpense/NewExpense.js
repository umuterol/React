import React, { useState } from "react";
import "./NewExpense.css";
import ExpenseForm from "./ExpenseForm";

function NewExpense(props) {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseHandler = (expense) => {
    const newExpense = {
      id: Math.random().toString(),
      ...expense,
    };
    props.onAddExpense(newExpense);
    openableHandler();
  };

  const openableHandler = () => {
    setIsEditing((prevEditing) => !prevEditing);
  };

  return (
    <div className="new-expense">
      {!isEditing ? (
        <button onClick={openableHandler}>Add New Expense</button>
      ) : (
        <ExpenseForm
          onCancel={openableHandler}
          onSaveExpense={saveExpenseHandler}
        />
      )}
    </div>
  );
}

export default NewExpense;
