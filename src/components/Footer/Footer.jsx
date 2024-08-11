import React from "react";
import "./Footer.css";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo}></img>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Necessitatibus tempora reiciendis dicta doloremque aperiam
            voluptate.
          </p>

          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>

        <div className="footer-content-centre">
          <h2>Company</h2>

          <ul>
            <li>Home</li>
            <li>About Us </li>
            <li>Privacy Policy</li>
            <li> Delivery</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in Touch</h2>
          <ul>
            <li>+1234566</li>
            <li>Contact@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copright @ Tomato.com</p>
    </div>
  );
};

export default Footer;
