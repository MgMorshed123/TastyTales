import React, { useState, useContext } from "react";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
import "./Login.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { setToken } = useContext(StoreContext);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    const url =
      currState === "login"
        ? "http://localhost:4000/api/auth/login"
        : "http://localhost:4000/api/auth/register";

    try {
      const response = await axios.post(url, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("TOKEN", response.data.token);
        Swal.fire({
          title: "Great to See you!",
          icon: "success",
        });
        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <motion.div
      className="login-popup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <form className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
          <h2>{currState === "login" ? "Login" : "Sign Up"}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "register" && (
            <input
              onChange={onChangeHandler}
              type="text"
              name="name"
              value={data.name}
              placeholder="Your name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your email"
            required
          />
          <input
            type="password"
            onChange={onChangeHandler}
            value={data.password}
            name="password"
            placeholder="Your password"
            required
          />
        </div>

        <button type="submit">
          {currState === "register" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy</p>
        </div>

        {currState === "login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("register")}>Click Here</span>
          </p>
        ) : (
          <p onClick={() => setCurrState("login")}>
            Already have an account? <span>Login Here</span>
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default Login;
