import React, { useContext, useEffect, useState } from "react";
import "./MyOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { assets } from "../../assets/food del assets/frontend_assets/assets";

const MyOrder = () => {
  const { url, token } = useContext(StoreContext);

  const [data, setData] = useState([]);

  console.log("data", data);

  const fetchOrders = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/order/userorders",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setData(response.data.data);
    console.log("response.data.data", response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <div className="container">
        {data.map((order, index) => {
          <div className="my-orders-order">
            <img src={assets.parcel_icon} alt="" srcset="" />

            <p>
              {order?.items.map((item, index) => {
                if (index === order?.items.length - 1) {
                  return item.name + "x " + item.quantity;
                } else {
                  return item.name + " x" + item.quantity + ",";
                }
              })}
            </p>

            <p>${order.amount}</p>
            <p> Items : ${order.items.length}</p>

            <p>
              {" "}
              <span>&#x25cf</span> <b>{order.status}</b>
            </p>
          </div>;
        })}
      </div>
    </div>
  );
};

export default MyOrder;
