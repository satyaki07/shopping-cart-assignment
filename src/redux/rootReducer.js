import { combineReducers } from "redux";
import cartReducer from "./cart/cart-reducer";
import authReducer from "./auth/auth-reducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

export default rootReducer;
