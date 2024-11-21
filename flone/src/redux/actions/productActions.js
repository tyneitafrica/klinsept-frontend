// import  products from "../../data/products.json"
import { getProducts } from "../../helpers/backendFectch";
// import axios from "axios";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products
});

// export const fetchProducts = () => {
//   return dispatch => {
//     dispatch(fetchProductsSuccess(products));
//   };
// };

// Fetch products from server
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const products = await getProducts();
      dispatch(fetchProductsSuccess(products.results));
    } catch (error) {
      console.error("Fetch Products error:", error);
    }
  };
};