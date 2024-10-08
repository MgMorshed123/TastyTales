import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  // console.log(cartItems);

  // console.log(cartItems, addToCart, removeFromCart);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          src={`http://localhost:4000/images/${image}`}
          className="food-item-image"
          alt=""
          srcset=""
        />

        {!cartItems || !cartItems[id] ? (
          <img
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            className="add"
            alt=""
            srcset=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=""
              srcset=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=""
              srcset=""
            />
          </div>
        )}

        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" srcset="" />
          </div>

          <p className="food-item-desc">{description}</p>
          <p className="food-item-price"> ${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
