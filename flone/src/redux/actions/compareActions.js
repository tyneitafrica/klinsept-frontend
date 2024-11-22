import { toast } from "react-hot-toast";

export const ADD_TO_COMPARE = "ADD_TO_COMPARE";
export const DELETE_FROM_COMPARE = "DELETE_FROM_COMPARE";

// Add to compare
export const addToCompare = (item) => {
  return (dispatch) => {
    toast.dismiss()
    toast.success("Added To Compare", {
      autoClose: 3000,
      hideProgressBar: true,
    });
    dispatch({ type: ADD_TO_COMPARE, payload: item });
  };
};

// Delete from compare
export const deleteFromCompare = (item) => {
  return (dispatch) => {
    toast.dismiss()
    toast.error("Removed From Compare", {
      autoClose: 3000,
      hideProgressBar: true,
    });
    dispatch({ type: DELETE_FROM_COMPARE, payload: item });
  };
};
