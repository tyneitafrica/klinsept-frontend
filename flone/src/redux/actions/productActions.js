import  products from "../../data/products.json"
import axios from "axios";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

export const fetchProducts = () => {
  return dispatch => {
    dispatch(fetchProductsSuccess(products)); // Use local mock data
  };
};

// Fetch products from server
// export const fetchProducts = () => {
//   return async dispatch => {
//     try {
//       dispatch(fetchProductsSuccess(products));
//       const response = await axios.get("http://localhost:3000/products.json"); // Replace with your API endpoint
//       // console.log(response.data)
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//       // Optionally Dispatch an error action for error handling
//     }
//   };
// };
