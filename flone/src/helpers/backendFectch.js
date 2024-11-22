import axios from "axios";
import { logoutUser } from "../redux/actions/appAction";
import toast from "react-hot-toast";
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
// const API_URL = "https://klinsept-backend.onrender.com/api/v1.0/";

export const registerFetch = async (registerData) => {
  const response = await axios.post(`${API_URL}auth/signin/`, registerData, {
    headers: {
      "x-api-key": API_KEY,
    },
  });
  return response;
};

export const LoginFetch = async (loginData) => {
  const response = await axios.post(`${API_URL}/auth/login/`, loginData, {
    withCredentials: true,
    headers: {
      "x-api-key": API_KEY,
      "Content-Type": "application/json",
    },
  });
  console.log(response.data.jwt);
  return response;
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}auth/otp/request/`,
      { email },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    // Extract a readable error message
    const errorMessage =
      error.response?.data?.error ||
      "An unexpected error occurred. Please try again.";
    console.error("Forgot Password error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${API_URL}auth/otp/confirm/`, data, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // Extract a readable error message
    const errorMessage =
      error.response?.data?.error ||
      "An unexpected error occurred. Please try again.";
    console.error("Reset Password error:", error);
    throw new Error(errorMessage);
  }
};

export const serverLogOut = async (dispatch, toast) => {
  try {
    const response = await axios.post(
      `${API_URL}auth/logout/`,
      {},
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      toast.error(response.data.Message);
      dispatch(logoutUser());
    }
  } catch (error) {
    console.error("Server Log Out error:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}products/`, {
      headers: {
        "x-api-key": "f6c52669-b6a9-4901-8558-5bc72b7e983a",
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Get Products error:", error.response?.data);
    throw error;
  }
};

export const isAuthenticated = async () => {
  try {
    const response = await axios.get(`${API_URL}auth/cookie/`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Authentication check failed", error);
    return null;
  }
};

export const addItemToCart = async (item, quantityCount = 1) => {
  try {
    toast.dismiss();

    const addToCartPromise = axios.post(
      `${API_URL}cart/add/`,
      {
        product_id: item.id,
        quantity: quantityCount,
      },
      {
        headers: {
          "x-api-key": `${API_KEY}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    const response = await toast.promise(
      addToCartPromise,
      {
        loading: `Adding ${item.name} to cart...`,
        success: `${item.name} added to cart successfully!`,
        error: (err) => `Failed to add ${item.name} to cart: ${err.message}`,
      },
      {
        success: {
          duration: 2000,
        },
        error: {
          duration: 4000,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to add item to cart");
    }

    return response.data;
  } catch (error) {
    console.error("Error adding item to cart:", error);
    throw error;
  }
};

export const getCartItems = async () => {};
