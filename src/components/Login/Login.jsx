import React, { useState } from "react";
import { assets } from "../../assets/food del assets/frontend_assets/assets";

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("login");

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
            <input type="text" placeholder="Your name" required />
          )}
          <input type="email" name="" placeholder="Your email" required />

          <input
            type="password"
            name=""
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
