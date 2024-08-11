import React, { useContext } from "react";
// import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";
const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <he>Top Dishs Near Your</he>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          return (
            <FoodItem
              key={index}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            ></FoodItem>
          );
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
