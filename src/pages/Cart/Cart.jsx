import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItems, removeFromCart, food_list, getTotalCartAmount } =
    useContext(StoreContext);

  console.log("cartjsx cartItemn", cartItems);
  let deliveryFee = Math.round(getTotalCartAmount() * 0.1);

  const navigate = useNavigate();
  console.log("localStorage.getItem", localStorage.getItem("TOKEN"));

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

        {food_list.map((item, index) => {
          // console.log(item);
          if (cartItems?.[item._id] > 0) {
            return (
              <>
                <div className="cart-items-title cart-items-item">
                  <img
                    src={`http://localhost:4000/images/${item.image}`}
                    alt=""
                    srcset=""
                  />

                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </>
            );
          }
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
              <p>Delivery Fee (10%)</p>
              <p> {deliveryFee} </p>
            </div>

            <hr />

            <div className="cart-total-details">
              <p>Total</p>
              <b>{getTotalCartAmount() + deliveryFee}</b>
            </div>

            <hr />
          </div>

          <Link to="/order" className="button">
            Proceed To Checkout{" "}
          </Link>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code , Enter it here </p>
            <div className="cart-promocode-input">
              <input type="text" name="" id="" placeholder="promocode" />

              <button className="button">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
