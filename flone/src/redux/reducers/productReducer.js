import { FETCH_PRODUCTS_SUCCESS } from "../actions/productActions";

import { FETCH_BLOGS_SUCCESS } from "../actions/productActions";

const initState = {
  products: [],
  blogs: [],
  timestamp: 0, 
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        timestamp: action.timestamp, 
      };
    case FETCH_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: action.payload,
      }
    default:
      return state;
  }
};

export default productReducer;
