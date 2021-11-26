import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import "./cart.css";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../redux/cart/cart-actions";

function Cart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const checkoutPrice = cartItems.reduce(
    (acc, curr) => (acc += curr.price * curr.quantity),
    0
  );

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="cart-page">
          <div style={{ fontWeight: "bold", fontSize: "22px", margin: "5px" }}>
            No items in your cart
          </div>
          <div style={{ fontSize: "16px", margin: "5px" }}>
            Your favorite items are just a click away
          </div>
          <Link to="?products">
            <button className="btn-shopping">Start Shopping</button>
          </Link>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-title">
            <div
              style={{
                marginTop: "10px",
                marginLeft: "15px",
                marginBottom: "10px",
                fontSize: "20px",
              }}
            >
              My Cart ({cartItems.length} items)
            </div>
          </div>

          <div
            style={{
              width: "100%",
              maxHeight: "60vh",
              minHeight: "60vh",
              overflowY: "scroll",
            }}
          >
            {cartItems.map((item) => (
              <div className="cart-items-container">
                <div className="cart-item">
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    height="80"
                    width="80"
                  />
                  <div className="cart-item-desc">
                    <div>{item.name}</div>
                    <div style={{ display: "flex", margin: "10px" }}>
                      <button
                        onClick={() =>
                          dispatch(decrementQuantity({ id: item.id }))
                        }
                        className="btn-primary-cart"
                      >
                        -
                      </button>
                      <div style={{ margin: "0 15px" }}>{item.quantity}</div>
                      <button
                        className="btn-primary-cart"
                        onClick={() =>
                          dispatch(incrementQuantity({ id: item.id }))
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div style={{ alignSelf: "center" }}>
                    Rs. {item.price * item.quantity}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="checkout-btn">
            <div
              onClick={() => history.push("/login")}
              style={{ display: "flex" }}
            >
              <div
                style={{ width: "50%", marginLeft: "30px", textAlign: "left" }}
              >
                Proceed to checkout
              </div>
              <div
                style={{
                  width: "50%",
                  marginRight: "30px",
                  textAlign: "right",
                }}
              >
                Rs. {checkoutPrice} &nbsp; 
              </div>
            </div>
          </button>
        </div>
      )}
    </>
  );
}

export default Cart;
