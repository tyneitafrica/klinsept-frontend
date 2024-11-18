import axios from 'axios';

// Use the environment variables
const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
// const API_URL2 = process.env.REACT_APP_API_URL2;

export const registerFetch = async (registerData) => {
  try {
    const response = await axios.post(
      `${API_URL}api/v1.0/auth/signin/`,
      registerData,
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data) {
      localStorage.setItem('userData', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const LoginFetch = async (loginData) => {
  try {
    const response = await axios.post(
      `${API_URL}api/v1.0/auth/login/`,
      loginData,
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.data) {
      localStorage.setItem('userData', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const forgotPassword = async (email) =>{
  try {
    const response = await axios.post(
      `${API_URL}api/v1.0/auth/otp/request/`,
      { email },
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response)
    return response.data;
  } catch (error) {
    console.error('Forgot Password error:', error);
    throw error;
  }
}

export const getProducts = async ()=>{
  try {
    const response = await axios.get(
      `${API_URL}api/v1.0/products/`,
      // `${API_URL}products`,
      {
        headers: {
          'x-api-key': API_KEY,
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Get Products error:', error);
    throw error;
  }
}