export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});
