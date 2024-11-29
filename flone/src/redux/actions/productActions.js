export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

export const fetchProductsSuccess = (products, timestamp) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
  timestamp,
});