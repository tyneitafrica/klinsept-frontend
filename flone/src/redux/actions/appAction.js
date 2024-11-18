// appAction.js

export const SET_USER_DATA = "SET_USER_DATA";

// Action to set the user data
export const setUserData = (userData) => {
  return {
    type: SET_USER_DATA,
    payload: userData,
  };
};

export const setDarkMode = () => {
  return {
    type: "SET_DARK_MODE",
  };
};
