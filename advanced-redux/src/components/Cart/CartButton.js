import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../store/ui";

import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const totalQuatity = useSelector((state) => state.cart.totalQuatity);
  const dispatch = useDispatch();

  const toggleHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <button className={classes.button} onClick={toggleHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuatity}</span>
    </button>
  );
};

export default CartButton;
