import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const { url } = useContext(StoreContext);

  const navigate = useNavigate();
  console.log(success, orderId);

  const verifyPayment = async () => {
    const response = await axios.post(
      "http://localhost:4000/api/order/verify",
      {
        success,
        orderId,
      }
    );

    if (response.data.success) {
      navigate("/myorder");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="VERIFY">
      <div className="SPINNER"></div>
    </div>
  );
};

export default Verify;
