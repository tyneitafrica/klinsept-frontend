// import  products from "../../data/products.json"
// import { getProducts } from "../../helpers/backendFectch";
import axios from "axios";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
const API_URL = process.env.REACT_APP_API_URL;
// const API_KEY = process.env.REACT_APP_API_KEY;

const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// export const fetchProducts = () => {
//   return dispatch => {
//     dispatch(fetchProductsSuccess(products));
//   };
// };

// Fetch products from server
export const fetchProducts = () => {
  return async (dispatch) => {
    // Use async dispatch
    try {
      const response = await axios.get(`${API_URL}products/`, {
        headers: {
          "x-api-key": "f6c52669-b6a9-4901-8558-5bc72b7e983a",
        },
      });

      dispatch(fetchProductsSuccess(response.data.results));
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Get Products error:", error.response?.data);
      throw error;
    }
  };
};
