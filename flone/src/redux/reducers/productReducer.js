import { FETCH_PRODUCTS_SUCCESS } from "../actions/productActions";

const initState = {
  products: [],
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
    default:
      return state;
  }
};

export default productReducer;
