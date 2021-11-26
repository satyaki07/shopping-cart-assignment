import * as cartTypes from "./cart-types";

const INITIAL_STATE = {
  cart: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      let index = state.cart.findIndex((item) => item.id === action.payload.id);
      if (index === -1) {
        let newItem = { ...action.payload, quantity: 1 };
        return { ...state, cart: [...state.cart, newItem] };
      } else {
        let items = { ...state };
        items.cart[index].quantity++;
        return items;
      }

    case cartTypes.INCREMENT_QUANTITY:
      let index2 = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      const newCart = [...state.cart];
      newCart[index2].quantity++;
      return { ...state, cart: newCart };

    case cartTypes.DECREMENT_QUANTITY:
      let index3 = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      const newCart2 = [...state.cart];
      if (newCart2[index3].quantity > 1) {
        newCart2[index3].quantity--;
      } else {
        newCart2.splice(index3, 1);
      }
      return { ...state, cart: newCart2 };

    default:
      return state;
  }
};

export default cartReducer;
