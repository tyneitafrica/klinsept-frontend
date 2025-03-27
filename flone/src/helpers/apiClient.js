import axios from "axios";
import toast from "react-hot-toast";


const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL, // Replace with your API base URL
  timeout: 10000, // 10 seconds timeout

  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
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
          console.warn("Unauthorized! Redirecting to login...");
        toast.error("Unauthorized! Redirecting to login...");
        // localStorage.removeItem("token");
        // window.location.href = "/login"; // Redirect to login page
      } else if (status === 403) {
          console.warn("Forbidden! You don't have access.");
        toast.error("Forbidden! You don't have access.");
      } else if (status === 500) {
          console.error("Server error! Try again later.");
        toast.error("Server error! Try again later.");
      }
    } else {
        console.error("Network Error! Check your connection.");
        toast.error("Network Error! Check your connection.");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
