import axios from "axios";
import { logoutUser } from "../redux/actions/appAction";
import { fetchProductsSuccess } from "../redux/actions/productActions";
import toast from "react-hot-toast";
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
// const API_URL = "https://klinsept-backend.onrender.com/api/v1.0/";

export const registerFetch = async (registerData) => {
  return toast.promise(
    axios.post(`${API_URL}auth/signin/`, registerData, {
      headers: {
        "x-api-key": API_KEY,
      },
    }),
    {
      loading: "Creating your account...",
      success: (response) => {
        console.log(response.data);
        return "Account created successfully!";
      },
      error: (error) => {
        const errorMessage =
          error.response?.data?.detail || "An error occurred";
        return `Error: ${errorMessage}`;
      },
    }
  );
};

export const LoginFetch = async (loginData, dispatch, navigate) => {
  // Display a loading toast while making the request
  return toast
    .promise(
      axios.post(`${API_URL}auth/login/`, loginData, {
        withCredentials: true,
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Logging in...",
        success: (response) => {
          console.log(response.data.jwt);
          setTimeout(() => {
            navigate("/my-account");
          }, 4000);
          return "Login successful!";
        },
        error: (error) => {
          const errorMessage =
            error.response?.data?.detail ||
            error.message ||
            "An error occurred";
          return `Error: ${errorMessage}`;
        },
      }
    )
    .catch((err) => {
      // You can catch any unhandled promise rejections here if needed
      // console.error("Unhandled Error:", err);
    });
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
        },
        withCredentials: true,
      }
    );
    if (response.status === 200) {
      toast.success(response.data.Message);
      // dispatch(logoutUser());
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
        "x-api-key": `${API_KEY}`,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Get Products error:", error.response?.data);
    throw error;
  }
};

export const fetchProducts = () => {
  return async (dispatch) => {
    // Use async dispatch
    try {
      const response = await axios.get(`${API_URL}products/`, {
        headers: {
          "x-api-key": `${API_KEY}`,
        },
      });

      dispatch(fetchProductsSuccess(response.data.results));
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Get Products error:", error.response?.data);
      throw error;
    }
  };
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
        error: (err) => `${err.response.data.error} for ${item.name}`,
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
    console.log(response);
    if (response.status !== 200) {
      throw new Error("Failed to add item to cart");
    }

    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getCartItems = async () => {
  try {
    const response = await axios.get(`${API_URL}cart/`, {
      headers: {
        "x-api-key": API_KEY,
      },
      withCredentials: true, // To include cookies
    });

    if (response.status === 200) {
      // setCartItems(response.data); // Save cart items to state
      console.log(response.data);
      return response.data;

      // Log response to console
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
