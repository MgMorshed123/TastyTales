import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart/Cart";
// import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Verify from "./components/Verify/Verify";
import MyOrder from "./components/MyOrder/MyOrder";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin}></Login> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin}></Navbar>
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/cart" element={<Cart></Cart>} />
          <Route path="/order" element={<PlaceOrder></PlaceOrder>} />
          <Route path="/verify" element={<Verify></Verify>} />
          <Route path="/myorder" element={<MyOrder></MyOrder>} />
        </Routes>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
