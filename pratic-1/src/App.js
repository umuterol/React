import React, { useState } from "react";
import Form from "./components/Form";
import UsersList from "./components/UsersList";

const initialState = [{ username: "Umut", age: 24 }];

function App() {
  const [users, setUsers] = useState(initialState);

  const saveUserHandler = (newUser) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

  return (
    <div>
      <Form saveUser={saveUserHandler} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
