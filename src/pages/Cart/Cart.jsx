import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./Cart.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { food_list } = useContext(StoreContext);
  const [cartItems, setCartItems] = useState([]);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  const removeFromCart = async (itemId) => {
    console.log(itemId);
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        await axios.post(
          "http://localhost:4000/api/cart/removeFromCart",
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };

  const deliveryFee = 4;

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve cart items from localStorage
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    } else {
      console.log("No cart items found in localStorage.");
    }
  }, []); // Empty dependency array, runs only once

  return (
    <div className="cart">
      <div className="cartItems">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item) => {
          if (cartItems?.[item._id] > 0) {
            return (
              <React.Fragment key={item._id}>
                <motion.div
                  className="cart-items-title cart-items-item"
                  initial={{ filter: "blur(10px)" }}
                  animate={{ filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={`http://localhost:4000/images/${item.image}`}
                    alt=""
                    srcSet=""
                  />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </motion.div>
                <hr />
              </React.Fragment>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>

          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>

            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee </p>
              {cartItems ? <p>{deliveryFee}</p> : ""}
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Total</p>
              <b>{getTotalCartAmount() + deliveryFee}</b>
            </div>

            <hr />
          </div>

          <Link to="/order" className="button">
            Proceed To Checkout
          </Link>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Promo code" />
              <button className="button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
