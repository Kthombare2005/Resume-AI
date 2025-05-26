import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (formData) => {
    try {
      setLoading(true);
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful login
      const mockUser = {
        id: '1',
        fullName: 'User',
        email: formData.email,
        phoneNumber: '',
        avatar: null
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    try {
      setLoading(true);
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful registration
      const mockUser = {
        id: '1',
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        avatar: null
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
    } catch (error) {
      throw new Error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Check for stored user data on initial load
  React.useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 