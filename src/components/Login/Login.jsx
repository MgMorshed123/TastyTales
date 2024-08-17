import React, { useEffect, useState } from "react";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
import "./Login.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Login = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { url, token, setToken } = useContext(StoreContext);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    let newUrl;
    if (currState === "login") {
      newUrl = "http://localhost:4000/api/auth/login";
    } else {
      newUrl = "http://localhost:4000/api/auth/register";
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);

      console.log("login", response);
      localStorage.setItem("TOKEN", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container">
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
            id=""
            required
          />
        </div>

        <button onClick={onLogin} type="submit">
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
      </form>
    </div>
  );
};

export default Login;
