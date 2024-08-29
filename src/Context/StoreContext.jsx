import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the stored token
  const storedToken = localStorage.getItem("TOKEN");

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    setCartItems(savedCartItems);
  }, []);

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch food list and load cart data if token is present
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, [storedToken]);

  const addToCart = async (itemId) => {
    console.log(itemId);
    if (token) {
      setIsLoading(true);
      try {
        await axios.post(
          "http://localhost:4000/api/cart/addTocart",
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCartItems((prev) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) + 1,
        }));
      } catch (error) {
        console.error("Failed to add item to cart:", error);
        setCartItems((prev) => {
          const updatedCart = { ...prev };
          if (updatedCart[itemId] > 1) {
            updatedCart[itemId] -= 1;
          } else {
            delete updatedCart[itemId];
          }
          return updatedCart;
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

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

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/cart/getFromCart",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("loadCartData response", response);
      setCartItems(response.data.data);
    } catch (error) {
      console.error("Failed to load cart data:", error);
    }
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/food/list");
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Failed to fetch food list:", error);
    }
  };

  const contextValue = {
    food_list,
    addToCart,
    cartItems,
    setCartItems,
    getTotalCartAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
