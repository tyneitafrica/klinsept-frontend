import axios from "axios";
import toast from "react-hot-toast";
import { addItemToCart, getCartItems,clearCartItems } from "../../helpers/backendFectch";

export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const SET_CART_ITEMS = "SET_CART_ITEMS";

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
        toast.success("gotten cart data");
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
export const deleteFromCart = (item) => {
  // console.log(item);
  return async (dispatch) => {
    // console.log(item);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}cart/remove/${item.product_id}`,
        {
          headers: {
            "x-api-key": process.env.REACT_APP_API_KEY, // Replace with your actual API key
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
     
          toast.success("Removed From Cart");
        
        dispatch({ type: DELETE_FROM_CART, payload: item.cartItemId });
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
