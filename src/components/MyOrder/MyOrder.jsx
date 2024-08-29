import React, { useContext, useEffect, useState } from "react";
import "./MyOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/food del assets/frontend_assets/assets";
import { motion } from "framer-motion";

const MyOrder = () => {
  const { token } = useContext(StoreContext);
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/order/userorders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Orders fetched successfully:", response.data);
      setData(response.data.data);
      localStorage.setItem("ordersData", JSON.stringify(response.data.data));
    } catch (error) {
      console.error(
        "Failed to fetch orders:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("ordersData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      fetchOrders();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 700); // Delay before removing blur effect

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>

      <motion.div
        className={`container ${isVisible ? "clear" : "blurred"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {data?.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="" />
            <p>
              {order?.items.map((item, index) => (
                <React.Fragment key={index}>
                  {index === order?.items.length - 1
                    ? `${item?.name} x ${item?.quantity}`
                    : `${item?.name} x ${item?.quantity}, `}
                </React.Fragment>
              ))}
            </p>
            <p>${order?.amount}</p>
            <p>Items: {order?.items?.length}</p>
            <p>
              <b>{order?.status}</b>
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MyOrder;
