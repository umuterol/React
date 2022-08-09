import React from "react";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import Button from "../UI/Button/Button";

const Home = () => {
  return (
    <AuthContext>
      {(ctx) => (
        <Card className={classes.home}>
          <h1>Welcome back!</h1>
          <Button onClick={ctx.onLogout}>Logout</Button>
        </Card>
      )}
    </AuthContext>
  );
};

export default Home;
