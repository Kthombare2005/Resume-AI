import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const logout = async () => {
  try {
    console.log('Attempting logout...');
    const response = await api.get('/auth/logout');
    console.log('Logout response:', response);
    
    // Clear any local state or cookies if needed
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error.response?.data?.message || 'Logout failed';
  }
};

export const getCurrentUser = async () => {
  try {
    console.log('Fetching current user...');
    const response = await api.get('/auth/me');
    console.log('Current user response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error.response || error);
    if (error.response?.status === 401) {
      return { success: false, message: 'Not authenticated' };
    }
    throw error.response?.data?.message || 'Failed to get user data';
  }
};

export const updateProfile = async (updateData) => {
  try {
    const response = await api.put('/users/profile', updateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update profile');
  }
}; 