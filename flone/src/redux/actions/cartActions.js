import axios from "axios";
import { addItemToCart, getCartItems } from "../../helpers/backendFectch";

export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";
export const SET_CART_ITEMS = "SET_CART_ITEMS";

export const fetchAndReplaceCart = (toast) => {
  return async (dispatch) => {
    try {
      const cartItems = await getCartItems(toast);

      if (cartItems?.message === "Cart is empty") {
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
    } catch (error) {
      console.error("Error fetching cart items:", error);
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
      console.log(responseData);

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
export const deleteFromCart = (itemId, addToast) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `https://klinsept-backend.onrender.com/api/v1.0/cart/remove${itemId}`,
        {
          headers: {
            "x-api-key": "f6c52669-b6a9-4901-8558-5bc72b7e983a", // Replace with your actual API key
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        if (addToast) {
          addToast("Removed From Cart", {
            appearance: "error",
            autoDismiss: true,
          });
        }
        dispatch({ type: DELETE_FROM_CART, payload: itemId });
      }
    } catch (error) {
      if (addToast) {
        addToast("Failed to Remove Item from Cart", {
          appearance: "error",
          autoDismiss: true,
        });
      }
      console.error(
        "Error removing item from cart:",
        error.response?.data || error.message
      );
    }
  };
};

//delete all from cart
export const deleteAllFromCart = () => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "https://klinsept-backend.onrender.com/api/v1.0/cart/clear/",
        {},
        {
          headers: {
            "x-api-key": "f6c52669-b6a9-4901-8558-5bc72b7e983a",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        console.log("response", response);
        alert("Removed All Items From Cart");

        dispatch({ type: DELETE_FROM_CART });
      }
    } catch (error) {
      if (error) {
        alert("Failed to Remove Item from Cart", {});
      }
    }
  };
};

// get stock of cart item
export const cartItemStock = (item) => {
  if (item.stock) {
    return item.stock;
  }
};
