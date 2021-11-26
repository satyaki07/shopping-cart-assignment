import React, { useState } from "react";
import "./login.css";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/auth/auth-actions";
import { useHistory } from "react-router-dom";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleForm = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const loginValidation = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user"));
    // console.log(user);
    if (
      user !== null &&
      user.email === loginDetails.email &&
      user.password === loginDetails.password
    ) {
      sessionStorage.setItem("isLogin", true);
      sessionStorage.setItem("username", user.firstName);
      dispatch(userLogin());
      history.push("/");
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid Login credentials!");
    }
  };

  return (
    <div className="login-page">
      <div className="login-text">
        <h1>Login</h1>
        <p style={{ color: "#535353" }}>
          We do not share your eprsonal details with anyone.
        </p>
      </div>
      <section className="login-form">
        <form>
          {errorMsg.length !== 0 && (
            <p style={{ fontSize: "1rem", color: "red" }}>{errorMsg}</p>
          )}
          {successMsg.length !== 0 && (
            <p style={{ fontSize: "1rem", color: "green" }}>{successMsg}</p>
          )}

          <input
            type="email"
            value={loginDetails.email}
            name="email"
            onChange={handleForm}
            placeholder="Email"
          />
          <input
            type="password"
            value={loginDetails.password}
            name="password"
            onChange={handleForm}
            placeholder="Password"
          />

          <button onClick={loginValidation} className="btn-login">
            Sign In
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
