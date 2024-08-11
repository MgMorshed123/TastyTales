import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../Context/StoreContext";

const FoodDisplay = () => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <he>Top Dishs Near Your</he>
    </div>
  );
};

export default FoodDisplay;
