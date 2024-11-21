import axios from "axios";
// import { setUserData } from "../redux/actions/appAction";


// Use the environment variables
const API_URL = "https://klinsept-backend.onrender.com/";
// const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = "f6c52669-b6a9-4901-8558-5bc72b7e983a";
// const API_URL2 = process.env.REACT_APP_API_URL2;

export const registerFetch = async (registerData) => {
  const response = await axios.post(
    `${API_URL}api/v1.0/auth/signin/`,registerData, {
      headers: {
        "x-api-key": API_KEY,
      },
    }    
  );
    return response;
}

    
export const LoginFetch = async (loginData) => {
    const response = await axios.post(
      "https://klinsept-backend.onrender.com/api/v1.0/auth/login/",
      loginData,
      {
        withCredentials: true,
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.jwt)
    return response
    
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(
      `${API_URL}api/v1.0/auth/otp/request/`,
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
      error.response?.data?.error || "An unexpected error occurred. Please try again.";
    console.error("Forgot Password error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await axios.post(
      `${API_URL}api/v1.0/auth/otp/confirm/`,
      data,
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
      error.response?.data?.error || "An unexpected error occurred. Please try again.";
    console.error("Reset Password error:", error);
    throw new Error(errorMessage);
  }
}


export const getProducts = async () => {
  try {
    const response = await axios.get(
      `${API_URL}api/v1.0/products/`,
      // `${API_URL}products`,
      {
        headers: {
          "x-api-key": API_KEY,
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Get Products error:", error);
    throw error;
  }
};
