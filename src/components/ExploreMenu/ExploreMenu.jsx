import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/food del assets/frontend_assets/assets";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
const ExploreMenu = ({ category, setCategory }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true });

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore Our Menu</h1>
      <p className="explore-menu-text">
        We Have Decilious , juicy Food For You
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <motion.div
              ref={ref}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              key={index}
              className="explore-menu-list-item"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 50,
              }}
            >
              <img
                className={category === item.menu_name ? "active" : ""}
                src={item.menu_image}
                alt=""
                srcset=""
              />
              <p>{item.menu_name}</p>
            </motion.div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
