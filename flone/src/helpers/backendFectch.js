import axios from "axios";
// import { logoutUser } from "../redux/actions/appAction";
import {
  fetchProductsSuccess,
  fetchBlogsSuccess,
} from "../redux/actions/productActions";
import apiClient from "./apiClient";
import toast from "react-hot-toast";
const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = "https://klinsept-backend.onrender.com/api/v1.0/";
// const API_URL = "http://localhost:8000/api/v1.0/";
// const API_URL = "http://192.168.1.88:8000/api/v1.0/";

export const registerFetch = async (registerData, navigate, setError) => {
  toast.dismiss();
  return toast.promise(
    axios.post(`${API_URL}auth/signin/`, registerData, {
      headers: {
        "x-api-key": API_KEY,
      },
    }),
    {
      loading: "Creating your account...",
      success: (response) => {
        // console.log(response.data);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        return response.data.message;
      },
      error: (error) => {
        const errorMessage =
          error.response?.data?.message || "An error occurred";
        setError(errorMessage);
        return `Error: ${errorMessage}`;
      },
    }
  );
};

export const LoginFetch = async (loginData, setLoading) => {
  setLoading(true);

  try {
    // Display a loading toast while making the request
    const response = await toast.promise(
      axios.post(`${API_URL}auth/login/`, loginData, {
        withCredentials: true,
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Logging in...",
        success: (res) => res.data.message,
        error: (err) => {
          const errorMessage =
            err.response?.data?.detail || err.message || "An error occurred";
          return ` ${errorMessage}`;
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Unhandled Error:", error);
    throw error; // Rethrow the error so it can be handled by the caller
  } finally {
    setLoading(false); // Ensure loading state is reset
  }
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
      toast.success(response.data.message);

      localStorage.removeItem("userData");
      localStorage.removeItem("userDataTimestamp");
      // dispatch(logoutUser());
    }
  } catch (error) {
    console.error("Server Log Out error:", error);
    throw error;
  }
};

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const toastId = toast.loading("Getting Products...");

    try {
      const state = getState().productData;
      console.log(state);
      const cachedProducts = state.products;
      const timestamp = state.timestamp;
      const currentTime = new Date().getTime();
      const timeDifference = (currentTime - timestamp) / (1000 * 60 * 60);

      if (cachedProducts.length > 0 && timeDifference < 0.5) {
        dispatch(fetchProductsSuccess(cachedProducts, timestamp));
        return cachedProducts;
      }

      const response = await axios.get(`${API_URL}products/`, {
        headers: {
          "x-api-key": `${API_KEY}`,
        },
      });

      const newTimestamp = new Date().getTime();
      dispatch(fetchProductsSuccess(response.data.data, newTimestamp));

      return response.data.data;
    } catch (error) {
      console.error("Get Products error:", error);
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  };
};

export const isAuthenticated = async (setLoading) => {
  try {
    const storedUserData = JSON.parse(localStorage.getItem("userData")) || null;
    const storedTimestamp = localStorage.getItem("userDataTimestamp");

    const currentTime = new Date().getTime();

    if (
      storedUserData &&
      storedTimestamp &&
      currentTime - storedTimestamp < 60 * 60 * 1000
    ) {
      return { status: 200, data: storedUserData };
    }

    if (setLoading) {
      setLoading(true);
    }

    const response = await axios.get(`${API_URL}auth/cookie/`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response);

    localStorage.setItem("userData", JSON.stringify(response.data));
    localStorage.setItem("userDataTimestamp", currentTime);

    return response;
  } catch (error) {
    // console.log(error)

    localStorage.removeItem("userData");
    localStorage.removeItem("userDataTimestamp");
    // toast.error(error?.response?.data?.error || error.message);
    return error ? error : { error: "Authentication failed." };
  } finally {
    if (setLoading) {
      setLoading(false);
    }
  }
};

export const addItemToCart = async (
  item,
  quantityCount = 1,
  size,
  order_type
) => {
  try {
    toast.dismiss();

    const addToCartPromise = axios.post(
      `${API_URL}cart/add/`,
      {
        product_id: item.id,
        quantity: quantityCount,
        size: size,
        order_type: order_type,
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
    // console.log(response);
    if (response.status !== 200) {
      throw new Error("Failed to add item to cart");
    }

    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const getCartItems = async (toast) => {
  try {
    const response = await axios.get(`${API_URL}cart/`, {
      headers: {
        "x-api-key": API_KEY,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const clearCartItems = () => {
  return async () => {
    try {
      const response = await axios.post(
        `${API_URL}cart/clear/`,
        {},
        {
          headers: {
            "x-api-key": API_KEY,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      if (error) {
        console.error("Error removing item from cart:", error);
        toast.error("Failed to Remove Item from Cart", {});
      }
    }
  };
};

export const createOrder = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}order/`, payload, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      withCredentials: true, // Ensure cookies are sent with the request
    });

    if (response.status === 200) {
      return response.data; // Return the response data
    } else {
      throw new Error("Failed to create order");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const getBlogs = () => {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching blogs...");

    try {
      const response = await apiClient.get(`blogs/`);

      toast.dismiss(toastId);

      if (response.status === 200) {
        toast.success("Blogs fetched successfully!");
        dispatch(fetchBlogsSuccess(response.data?.data || []));
        console.log(response.data?.data[2]);
        return response.data?.data || [];
      } else {
        toast.error("Failed to fetch blogs!");
        throw new Error("Failed to fetch blogs");
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error fetching blogs. Please try again.");
      console.error("Error getting blogs:", error);
      throw error; // Important to throw for catch block
    }
  };
};
