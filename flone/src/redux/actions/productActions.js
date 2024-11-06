
import axios from "axios";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});


// Fetch products from server
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get("http://localhost:3000/products.json"); // Replace with your API endpoint
      console.log(response.data)
      dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      console.error("Failed to fetch products:", error);
      // Optional: Dispatch an error action for error handling
    }
  };
};
