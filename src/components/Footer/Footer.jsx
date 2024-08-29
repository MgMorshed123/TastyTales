import React from "react";
import "./Footer.css";
import { assets } from "../../assets/food del assets/frontend_assets/assets";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true });

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1 className="title">Zomato</h1>
          <p>
            Welcome to our food ordering website, where your favorite meals are
            just a click away! Enjoy a seamless browsing experience, explore
            diverse cuisines, and have delicious dishes delivered straight to
            your door
          </p>

          <div ref={ref} className="footer-social-icons">
            <motion.img
              src={assets.facebook_icon}
              alt="Facebook"
              initial={{ rotateY: 0 }}
              animate={isInView ? { rotateY: 360 } : {}}
              transition={{ duration: 0.9 }}
            />
            <motion.img
              src={assets.twitter_icon}
              alt="Twitter"
              initial={{ rotateY: 0 }}
              animate={isInView ? { rotateY: 360 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
            <motion.img
              src={assets.linkedin_icon}
              alt="LinkedIn"
              initial={{ rotateY: 0 }}
              animate={isInView ? { rotateY: 360 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        <div className="footer-content-centre">
          <h2>Company</h2>

          <ul className="footer-link">
            <a href="/">Home</a>
            <a href="#explore-menu">Menu </a>
            <a href="#footer">Contact Us</a>
          </ul>
        </div>

        <div className="footer-content-right" ref={ref}>
          <h2>Get in Touch</h2>
          <motion.ul
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.3, // Delay between each list item
                },
              },
            }}
          >
            <motion.li
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              +1234566
            </motion.li>
            <motion.li
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              Contact@gmail.com
            </motion.li>

            <motion.li
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
            >
              Petaling Jaya, Malaysia
            </motion.li>
          </motion.ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copright @ Zomato.com</p>
    </div>
  );
};

export default Footer;
