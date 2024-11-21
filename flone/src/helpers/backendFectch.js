import axios from "axios";
import { logoutUser } from "../redux/actions/appAction";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

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
