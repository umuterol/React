import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuatity: 0,
  },
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuatity = action.payload.totalQuatity;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.itemId === newItem.id
      );
      state.totalQuatity++;
      if (!existingItem) {
        state.items.push({
          itemId: newItem.id,
          name: newItem.title,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.itemId === id);
      state.totalQuatity--;
      if (existingItem.quantity === 1) {
        // const removeIndex = state.items.indexOf(existingItem);
        // state.items.splice(removeIndex, 1);
        state.items = state.items.filter((item) => item.itemId !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

const fetchCartData = () => {
  return async (dispatch) => {
    const response = await fetch(
      "https://react-example-4ba77-default-rtdb.firebaseio.com/cart.json"
    );
    const cartData = await response.json();
    dispatch(
      cartSlice.actions.replaceCart({
        ...cartData,
        items: cartData.items || [],
      })
    );
  };
};

const addItemToCart = (newCart) => {
  return async (dispatch, getState) => {
    //notification
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "sending cart data!",
      })
    );

    //cart redux
    dispatch(cartSlice.actions.addItemToCart(newCart));
    const { cart } = getState();

    //cart database
    try {
      await fetch(
        "https://react-example-4ba77-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Send cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed.",
        })
      );
    }
  };
};

const removeItemFromCart = (id) => {
  return async (dispatch, getState) => {
    //notification
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending",
        message: "sending cart data!",
      })
    );

    //cart redux
    dispatch(cartSlice.actions.removeItemFromCart(id));
    const { cart } = getState();

    //cart database
    try {
      await fetch(
        "https://react-example-4ba77-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Send cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed.",
        })
      );
    }
  };
};

export const cartActions = {
  addItemToCart,
  removeItemFromCart,
  fetchCartData,
};
export default cartSlice.reducer;
