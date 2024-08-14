import React, { useEffect, useState } from "react";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
import "./Login.css";

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.taget.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
            srcset=""
          />
        </div>

        <div className="login-popup-inputs">
          {currState === "login" ? (
            <></>
          ) : (
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
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
            id=""
            required
          />
        </div>

        <button>
          {" "}
          {currState === "Sign-up" ? "Create-account" : "Login"}{" "}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By Continuing , i agree to the terms of use & privacy policy </p>
        </div>
        {currState === "login" ? (
          <p>
            Create a new Accoint ?{" "}
            <span onClick={() => setCurrState("Sign-Up")}>Clck Here</span>{" "}
          </p>
        ) : (
          <p onClick={() => setCurrState("login")}>
            Already Have an Account ? <span>Login Here </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
