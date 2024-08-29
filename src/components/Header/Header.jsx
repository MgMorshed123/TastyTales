import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="header">
      <motion.div
        className="header-contents"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <h2>Order Your Favorite Foods</h2>
        <p className="intro">
          Welcome to our food ordering website, where your favorite meals are
          just a click away! Enjoy a seamless browsing experience, explore
          diverse cuisines, and have delicious dishes delivered straight to your
          door.
        </p>
        <a href="#explore-menu">
          {" "}
          <button>View Menu</button>
        </a>
      </motion.div>
    </div>
  );
};

export default Header;
