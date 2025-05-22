import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Background from './components/Background';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import * as api from './services/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4361ee',
      light: '#4361ee',
      dark: '#3a0ca3',
    },
    secondary: {
      main: '#4361ee',
    },
    background: {
      default: 'transparent',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666666',
    }
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 500,
      lineHeight: 1.6,
      color: '#666666',
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.95rem',
      lineHeight: 1.6,
      color: '#666666',
    }
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '10px 20px',
          boxShadow: 'none',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: '#4361ee',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#3a0ca3',
          },
        },
        outlined: {
          borderColor: '#4361ee',
          color: '#4361ee',
          '&:hover': {
            backgroundColor: 'rgba(67, 97, 238, 0.04)',
            borderColor: '#3a0ca3',
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
          '@media (min-width: 600px)': {
            paddingLeft: 32,
            paddingRight: 32,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderRadius: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
  },
});

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking authentication status...');
        const response = await api.getCurrentUser();
        console.log('Auth check response:', response);
        
        if (response.success) {
          console.log('User authenticated:', response.user);
          setUser(response.user);
        } else {
          console.log('User not authenticated');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthError(error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (loading) {
      console.log('Auth status: Loading...');
      return null; // or a loading spinner
    }
    
    console.log('Protected route check - User:', user ? 'Authenticated' : 'Not authenticated');
    return user ? children : <Navigate to="/auth" />;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          overflowX: 'hidden',
          overflowY: 'auto',
          width: '100%',
          position: 'relative'
        }}>
          <Background />
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
            <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <Auth setUser={setUser} />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard user={user} setUser={setUser} />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
