export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";

export const fetchProductsSuccess = (products, timestamp) => (
  {
  
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

// fetch blogs

export const FETCH_BLOGS_SUCCESS = "FETCH_BLOGS_SUCCESS";

export const fetchBlogsSuccess = (blogs) => ({
  type: FETCH_BLOGS_SUCCESS,
  payload: blogs,
});