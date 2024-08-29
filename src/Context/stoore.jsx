/* 

mport axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const url = "https://localhost:4000";

  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  // console.log(food_list);
  const storedToken = localStorage.getItem("TOKEN");
  const [isLoading, setIsLoading] = useState(false);

  const addToCart = async (itemId) => {
    console.log(itemId);

    // Optimistically update the cart state

    if (token) {
      setIsLoading(true);
      try {
        await axios.post(
          "http://localhost:4000/api/cart/addTocart",
          { itemId },
          { headers: { Authorization: Bearer ${token} } } // Use Bearer token here
        );

        setCartItems((prev = {}) => ({
          ...prev,
          [itemId]: (prev[itemId] || 0) + 1,
        }));
      } catch (error) {
        console.error("Failed to add item to cart:", error);

        // Revert cart state on error
        setCartItems((prev = {}) => {
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

  const removeFromCart = async (itemId) => {
    console.log(itemId);

    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      try {
        await axios.post(
          "http://localhost:4000/api/cart/removeFromCart",
          { itemId },
          { headers: { Authorization: Bearer ${token} } }
        );
      } catch (error) {}
    }
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

  const loadCartData = async (token) => {
    const response = await axios.post(
      "http://localhost:4000/api/cart/getFromCart",
      {},
      { headers: { Authorization: Bearer ${token} } }
    );
    console.log("token", token);
    console.log("loadCartDatasssss", response);
    setCartItems(response.data.data);
    console.log("cartItems", cartItems);
  };

  const fetchFoodList = async () => {
    const response = await axios.get("http://localhost:4000/api/food/list");
    // console.log(response.data.data);
    setFoodList(response.data.data);
  };

  useEffect(() => {
    // Save cart items to localStorage whenever cartItems changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
    setCartItems(savedCartItems);
    async function loadData() {
      await fetchFoodList();
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  // console.log("cartItems", cartItems);

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
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
*/
