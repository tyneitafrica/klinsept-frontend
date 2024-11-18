// appReducer.js
const initialState = {
  darkMode: localStorage.getItem("darkMode") === "true",
  userData: [],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case "SET_USER_DATA":
      return {
        ...state,
        userData: action.payload,
      }

    default:
      return state;
  }
};

export default appReducer;
