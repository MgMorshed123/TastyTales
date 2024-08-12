import React, { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);

  let deliveryFee = Math.round(getTotalCartAmount() * 0.1);

  return (
    <div className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fileds">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>

        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Street" />

        <div className="multi-fileds">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>

        <div className="multi-fileds">
          <input type="text" placeholder="Zip Code " />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" PlaceOrder="Phone" />
      </div>

      <div className="place-order-right">
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

          <button className="button">Proceed To Payment </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
