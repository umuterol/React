import React, { useState, useContext, useEffect } from "react";
import MealContext from "./store/meal-context";

import Header from "./components/Header/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";

const testReducer = (state, action) => {
  if ("test" === action.type) {
    console.log("test app reducer");
    return state + 1;
  }
  return [];
};

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const { cart: cartCtx } = useContext(MealContext);

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      hideCartHandler();
    }
  }, [cartCtx]);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </>
  );
}

export default App;
