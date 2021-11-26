import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../logo.png";
import "./navbar.css";

function NavBar() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState("");
  const isLogin = useSelector((state) => state.auth.isLogin);
  const cart = useSelector((state) => state.cart.cart);
  const sessionLogin = sessionStorage.getItem("isLogin");

  useEffect(() => {
    setLoginStatus(isLogin || sessionLogin);
    setUsername(sessionStorage.getItem("username"));
  }, [isLogin, sessionLogin]);

  return (
    <header className="header">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img
              src={logo}
              className="logo-img"
              alt="logo"
              height="73"
              width="120"
            />
          </Link>
        </div>
        <div className="left-menu">
          <Link className="left-menu-item" to="/">
            Home
          </Link>
          <Link className="left-menu-item" to="/products">
            Products
          </Link>
        </div>
        <div className="right-menu">
          <div className="right-menu-items">
            {loginStatus ? (
              <>
              <div className="right-menu-item" style={{textDecoration: "none"}}>Welcome, {username}</div>
              <Link className="right-menu-item" >
                  <div>Logout</div>
                </Link>
              </>
            ) : (
              <>
                <Link className="right-menu-item" to="/login">
                  <div>Sign In</div>
                </Link>
                <Link className="right-menu-item" to="/register">
                  <div>Register</div>
                </Link>
              </>
            )}
          </div>

          <Link className="cart" to="/cart">
            <img
              src="/static/images/cart.svg"
              alt="cart"
              height="28"
              width="28"
            />
            <div className="cart-text">{cart.length} items</div>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
