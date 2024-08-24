import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./PlaceOrder.css";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  console.log("token", token);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    zipcode: "",
    country: "",
    state: "",
    phone: "",
  });

  let deliveryFee = Math.round(getTotalCartAmount() * 0.1);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const placeorder = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      food_list.forEach((item) => {
        if (cartItems[item._id] > 0) {
          let itemInfo = { ...item, quantity: cartItems[item._id] };
          orderItems.push(itemInfo);
        }
      });

      let orderData = {
        address: data,
        items: orderItems,
        amount: getTotalCartAmount() + deliveryFee,
      };

      const response = await axios.post(
        "http://localhost:4000/api/order/place",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        console.log("Order failed:", response.data);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <form onSubmit={placeorder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>

        <div className="multi-fileds">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            type="text"
            value={data.firstName}
            placeholder="First Name"
          />

          <input
            required
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            type="text"
            placeholder="Last Name"
          />
        </div>

        <input
          required
          name="email"
          value={data.email}
          type="email"
          onChange={onChangeHandler}
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          type="text"
          placeholder="Street"
        />

        <div className="multi-fileds">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />

          <input
            required
            type="text"
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            placeholder="State"
          />
        </div>

        <div className="multi-fileds">
          <input
            required
            name="zipcode"
            value={data.zipcode}
            onChange={onChangeHandler}
            placeholder="Zip Code "
          />

          <input
            required
            type="text"
            value={data.country}
            onChange={onChangeHandler}
            placeholder="Country"
            name="country"
          />
        </div>
        <input
          required
          type="text"
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          placeholder="Phone"
        />
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
            <button type="submit" className="button">
              Proceed To Payment{" "}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
