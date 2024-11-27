import uuid from "uuid/v4";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART,
  SET_CART_ITEMS, // Import the new action
} from "../actions/cartActions";

const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state;
  const product = action.payload;

  switch (action.type) {
    case ADD_TO_CART: {
      const cartItem = cartItems.find((item) => item.id === product.id);
      if (!cartItem) {
        return [
          ...cartItems,
          {
            ...product,
            quantity: product.quantity || 1,
            cartItemId: uuid(),
          },
        ];
      } else {
        return cartItems.map((item) =>
          item.cartItemId === cartItem.cartItemId
            ? {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
              }
            : item
        );
      }
    }

    case DECREASE_QUANTITY: {
      if (product.quantity === 1) {
        return cartItems.filter(
          (cartItem) => cartItem.cartItemId !== product.cartItemId
        );
      } else {
        return cartItems.map((item) =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
    }

    case DELETE_FROM_CART: {
      return cartItems.filter(
        (cartItem) => cartItem.cartItemId !== product.cartItemId
      );
    }

    case DELETE_ALL_FROM_CART: {
      return [];
    }

    case SET_CART_ITEMS: {
      return action.payload.map((item) => ({
        ...item,
        cartItemId: uuid(), // Add unique IDs for items if necessary
      }));
    }

    default:
      return state;
  }
};

export default cartReducer;
