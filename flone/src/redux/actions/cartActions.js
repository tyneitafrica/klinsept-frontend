import axios from "axios";
import toast from "react-hot-toast";
import { addItemToCart, getCartItems,clearCartItems } from "../../helpers/backendFectch";
export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const SET_CART_ITEMS = "SET_CART_ITEMS";

const API_KEY = "f6c52669-b6a9-4901-8558-5bc72b7e983a";
const API_URL = "https://klinsept-backend-new.onrender.com/api/v1.0/";

export const fetchAndReplaceCart = (setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    try {
      const cartItems = await getCartItems(toast);
      if (cartItems?.message) {
        toast.error(cartItems.message);
        dispatch({
          type: DELETE_ALL_FROM_CART,
        });
      } else {
        dispatch({
          type: SET_CART_ITEMS,
          payload: cartItems,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false)
      console.error("Error fetching cart items:", error);
    }finally{
      setLoading(false);
    }
  };
};

export const addToCart = (item, quantityCount = 1, size, order_type) => {
  return async (dispatch) => {
    try {
      const responseData = await addItemToCart(
        item,
        quantityCount,
        size,
        order_type
      );
      // console.log(responseData);

      dispatch({
        type: ADD_TO_CART,
        payload: {
          ...responseData.product,
          quantity: responseData.quantity,
        },
      });
      return responseData;
    } catch (error) {
      console.error("Redux action error:", error);
    }
  };
};

export const decreaseQuantity = (item, addToast) => {
  return (dispatch) => {
    if (addToast) {
      addToast("Item Decremented From Cart", {
        appearance: "warning",
        autoDismiss: true,
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
export const deleteFromCart = (item,dispatch) => {
  return async () => {
    try {
      const response = await axios.delete(
        `${API_URL}cart/remove/${item.product_id}/`,
        {
          headers: {
            "x-api-key":API_KEY, 
            "Content-Type": "application/json",
          },
          params:{
            size:item.size,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
     
          // toast.success("Removed From Cart");
        
        dispatch({ type: DELETE_FROM_CART, payload: item });
      }
    } catch (error) {
      toast.error("Failed to Remove Item from Cart");
      console.error("Error removing item from cart:", error);
    }
  };
};

//delete all from cart
export const deleteAllFromCart = () => {
  return async (dispatch) => {
    try {
      const response = await dispatch(clearCartItems()); 

      if (response.status === 200) {
        toast.success(response.data.message);

        dispatch({ type: DELETE_ALL_FROM_CART });
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to Remove Item from Cart");
    }
  };
};

// get stock of cart item
export const cartItemStock = (item) => {
  if (item.stock) {
    return item.stock;
  }
};
