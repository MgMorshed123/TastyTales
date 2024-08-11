import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const [itemCount, setItemCount] = useState(0);

  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  console.log(cartItems, addToCart, removeFromCart);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img src={image} className="food-item-image" alt="" srcset="" />

        {!cartItems[id] ? (
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
            <p>{itemCount}</p>
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
            <img src={assets.rating_starts} alt="" srcset="" />
            <p>{name}</p>
          </div>

          <p className="food-item-desc">{description}</p>
          <p className="food-item-price"> ${price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
