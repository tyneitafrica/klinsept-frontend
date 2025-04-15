import axios from "axios";
import toast from "react-hot-toast";

const API_KEY = "f6c52669-b6a9-4901-8558-5bc72b7e983a";
const API_URL = "https://klinsept-backend-new.onrender.com/api/v1.0/";
// const API_URL = "http://localhost:8000/api/v1.0/";

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "x-api-key": API_KEY,
  },
});

// Request Interceptor (Before the request is sent)
apiClient.interceptors.request.use(
  (config) => {
    // Example: Add auth token if it exists
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    toast.error("Request Error! Check your connection.");
    return Promise.reject(error);
  }
);

// Response Interceptor (After the response is received)
apiClient.interceptors.response.use(
  (response) => {
    // ✅ Response is successful
    return response;
  },
  (error) => {
    // ❌ Handle common errors (e.g., 401, 403)
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        console.error(
          error.response?.data?.error || "Unauthorized! Redirecting to login..."
        );
        // toast.error("Unauthorized! Redirecting to login...");
      } else if (status === 403) {
        console.error("Forbidden! You don't have access.");
        toast.error("Forbidden! You don't have access.");
      } else if (status === 500) {
        console.error("Server error! Try again later.");
        toast.error("Server error! Try again later.");
      }
    } else {
console.log("Network error:",error)
      console.error("Network Error! Check your connection.");
      toast.error("Network Error! Check your connection.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
