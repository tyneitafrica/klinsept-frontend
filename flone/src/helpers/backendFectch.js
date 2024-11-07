import axios from 'axios';

// Assuming your .env has the API URL and API key
const API_URL = 'http://192.168.1.61:8000'; // Example: "https://your-api-endpoint.com"
const API_KEY = 'f6c52669-b6a9-4901-8558-5bc72b7e983a';

export const registerFetch = async (registerData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1.0/auth/signin/`,  // Adjust your API endpoint here
      registerData,
      {
        headers: {
          'x-api-key':`${API_KEY}`, 
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data) {
      localStorage.setItem('userData', JSON.stringify(response.data));  // Store user data in localStorage
    }
    return response.data; // return the response data
  } catch (error) {
    console.error('Registration error:', error);
    throw error; // rethrow or handle as needed
  }
};

export const LoginFetch = async (loginData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/v1.0/auth/login/`,  // Adjust your API endpoint here
      loginData,
      {
        headers: {
          'x-api-key':`${API_KEY}`, 
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data) {
      localStorage.setItem('userData', JSON.stringify(response.data));  // Store user data in localStorage
    }
    return response.data; // return the response data
  } catch (error) {
    console.error('Registration error:', error);
    throw error; // rethrow or handle as needed
  }
};
