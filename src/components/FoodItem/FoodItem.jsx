import React from "react";
import "./FoodItem.css";
import { assets } from "../../assets/food del assets/frontend_assets/assets";

const FoodItem = ({ name, price, description, image }) => {
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} className="food-item-image" alt="" srcset="" />

        <div className="food-item-info">
          <div className="food-item-name-rating">
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
