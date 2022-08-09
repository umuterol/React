import React, { useState, useReducer } from "react";

import DUMMY_MEALS from "../data/dummy-meals";

const MealContext = React.createContext({
  addCart: () => {},
  removeCart: () => {},
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

  return state;
};

export const MealContextProvider = (props) => {
  const [cartState, cartDispatch] = useReducer(cartReducer, initialCart);

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

  return (
    <MealContext.Provider
      value={{ meals: DUMMY_MEALS, cart: cartState, addCart, removeCart }}
    >
      {props.children}
    </MealContext.Provider>
  );
};

export default MealContext;
