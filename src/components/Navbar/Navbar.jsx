import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");

  const navigate = useNavigate();

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const logOut = () => {
    localStorage.removeItem("TOKEN");
    setToken("");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <h1 className="title">Zomato</h1>
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("Home")}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>

        <a
          href="#explore-menu"
          onClick={() => setMenu("Menu")}
          className={menu === "Menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("Mobile-App")}
          className={menu === "Mobile-App" ? "active" : ""}
        >
          Mobile-App
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("Contact-Us")}
          className={menu === "Contact-Us" ? "active" : ""}
        >
          Contact-Us
        </a>
      </ul>

      <div className="navbar-right">
        {token ? (
          <>
            <div className="navbar-search-icon">
              <Link to="/cart">
                {" "}
                <img src={assets.basket_icon} alt="" srcset="" />
              </Link>
              <div className={getTotalCartAmount() === 0 ? " " : "dot"}></div>
            </div>{" "}
          </>
        ) : (
          ""
        )}

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" srcset="" />

            <ul className="navbar-profile-dropdown">
              <li onClick={() => navigate("/myorder")}>
                <img src={assets.bag_icon} alt="" srcset="" /> <p>Orders</p>
              </li>
              <li>
                {" "}
                <img src={assets.bag_icon} alt="" srcset="" />
                <p onClick={logOut}>LogOut</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
