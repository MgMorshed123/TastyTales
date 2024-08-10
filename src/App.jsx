import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <div className="app">
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/cart" element={<Cart></Cart>} />
          <Route path="/placeOrder" element={<PlaceOrder></PlaceOrder>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
