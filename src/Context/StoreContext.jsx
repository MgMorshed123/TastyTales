import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const url = "https://localhost:4000";

  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  console.log(food_list);

  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (itemId) => {
    console.log(itemId);

    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));

    if (token) {
      setIsLoading(true);
      try {
        await axios.post(
          "http://localhost:4000/api/cart/addTocart",
          { itemId },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Failed to add item to cart:", error);
        // Optionally, you could revert the cart update here if needed
      } finally {
        setIsLoading(false);
      }
    }
  };

  const removeFromCart = (itemId) => {
    console.log(itemId);
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      {
        if (cartItems[item] > 0) {
          let itemInfo = food_list.find((product) => product._id === item);

          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }

    return totalAmount;
  };

  const contextValue = {
    food_list,
    addToCart,
    cartItems,
    setCartItems,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  const fetchFoodList = async () => {
    const response = await axios.get("http://localhost:4000/api/food/list");
    console.log(response.data.data);
    setFoodList(response.data.data);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("TOKEN")) {
        setToken(localStorage.getItem("TOKEN"));
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
