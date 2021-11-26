import React, { useState } from "react";
import "./register.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setSuccessMsg("");
      setErrorMsg("All fields are mandatory!");
    } else if (password !== confirmPassword) {
      setSuccessMsg("");
      setErrorMsg("Passwords do not match!");
    } else if (!pattern.test(email)) {
      setSuccessMsg("");
      setErrorMsg("Please enter a valid Email!");
    } else {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user !== null && user.email === email) {
        setErrorMsg("You are already registered. Please Login!");
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({ firstName, lastName, email, password })
        );
        setSuccessMsg("Successfully Registered!");
        setErrorMsg("");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    }
  };

  return (
    <div className="register-page">
      <div className="signup-text">
        <h1>Sign Up</h1>
        <p style={{ color: "#535353" }}>
          We do not share your eprsonal details with anyone.
        </p>
      </div>
      <section className="register-form">
        <form>
          {errorMsg.length !== 0 && (
            <p style={{ fontSize: "1rem", color: "red" }}>{errorMsg}</p>
          )}
          {successMsg.length !== 0 && (
            <p style={{ fontSize: "1rem", color: "green" }}>{successMsg}</p>
          )}
          <input
            type="text"
            value={formData.firstName}
            name="firstName"
            onChange={handleForm}
            placeholder="First Name"
          />
          <input
            type="text"
            value={formData.lastName}
            name="lastName"
            onChange={handleForm}
            placeholder="Last Name"
          />
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleForm}
            placeholder="Email"
          />
          <input
            type="password"
            value={formData.password}
            name="password"
            onChange={handleForm}
            placeholder="Password"
          />
          <input
            type="password"
            value={formData.confirmPassword}
            name="confirmPassword"
            onChange={handleForm}
            placeholder="Confirm Password"
          />
          <button onClick={validateForm} className="btn-signup">
            Sign Up
          </button>
        </form>
      </section>
    </div>
  );
}

export default Register;
