import React from "react";
import "./UsersList.css";

function UsersList(props) {
  return (
    <ul className="users-list">
      {props.users.map((user) => (
        <li className="users-list-item">
          <p>{user.username}</p>
          <p>{user.age}</p>
        </li>
      ))}
    </ul>
  );
}

export default UsersList;
