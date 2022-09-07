import React, { useReducer, useEffect, useState } from "react";

import DUMMY_MEALS from "../data/dummy-meals";
import useHttp from "../hooks/use-http";

const MealContext = React.createContext({
  addCart: () => {},
  removeCart: () => {},
  clearCart: () => {},
  meals: [],
  cart: { items: [], totalAmount: null },
});

const initialCart = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.quantity * action.item.price;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    let existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (!existingCartItem) {
      updatedItems = state.items.concat(action.item);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedItems = state.items.concat();
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    const updatedCartItems = [...state.items];

    if (existingCartItem.quantity <= 1) {
      updatedCartItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedCartItems[existingCartItemIndex] = updatedItem;
    }
    return {
      items: updatedCartItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR") {
    return initialCart;
  }

  return state;
};

export const MealContextProvider = (props) => {
  const [meals, setMeals] = useState([]);
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCart);
  const { isLoading, error, sendRequest: fetchRequest } = useHttp();

  useEffect(() => {
    const applyData = (data) => {
      const transformedMeals = [];

      for (const key in data) {
        const meal = {
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        };
        transformedMeals.push(meal);
      }

      setMeals(transformedMeals);
    };

    fetchRequest(
      {
        url: "https://react-example-4ba77-default-rtdb.firebaseio.com/meals.json",
      },
      applyData
    );
  }, [fetchRequest]);

  const addCart = (cartItem) => {
    cartDispatch({
      type: "ADD",
      item: cartItem,
    });
  };

  const removeCart = (id) => {
    cartDispatch({
      type: "REMOVE",
      id: id,
    });
  };

  const clearCart = (id) => {
    cartDispatch({
      type: "CLEAR",
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <MealContext.Provider
      value={{ meals, cart: cartState, addCart, removeCart, clearCart }}
    >
      {props.children}
    </MealContext.Provider>
  );
};

export default MealContext;
