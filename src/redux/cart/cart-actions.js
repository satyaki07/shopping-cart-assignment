import * as cartTypes from "./cart-types";

export const addToCart = (itemDetails) => {
  return {
    type: cartTypes.ADD_TO_CART,
    payload: itemDetails,
  };
};

export const incrementQuantity = (itemDetails) => {
  return {
    type: cartTypes.INCREMENT_QUANTITY,
    payload: itemDetails,
  };
};

export const decrementQuantity = (itemDetails) => {
  return {
    type: cartTypes.DECREMENT_QUANTITY,
    payload: itemDetails,
  };
};
