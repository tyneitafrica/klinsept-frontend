// import { toast } from "react-hot-toast";
export const ADD_TO_WISHLIST = "ADD_TO_WISHLIST";
export const DELETE_FROM_WISHLIST = "DELETE_FROM_WISHLIST";
export const DELETE_ALL_FROM_WISHLIST = "DELETE_ALL_FROM_WISHLIST";

export const addToWishlist = (item) => {
  return (dispatch) => {
    // if (toast) {
    //   // toast.remove();
    //   toast.success(`Liked product ${item.name}`);
    // }
    dispatch({ type: ADD_TO_WISHLIST, payload: item });
  };
};

export const deleteFromWishlist = (item, toast) => {
  return (dispatch) => {
    // if (toast) {
    //   // toast.remove();
    //   toast.error(`Removed ${item.name} From Wishlist`);
    // }
    dispatch({ type: DELETE_FROM_WISHLIST, payload: item });
  };
};

export const deleteAllFromWishlist = () => {
  return (dispatch) => {
    // if (toast) {
    //   toast.remove();
    //   toast.error("Removed All From Wishlist");
    // }
    dispatch({ type: DELETE_ALL_FROM_WISHLIST });
  };
};
