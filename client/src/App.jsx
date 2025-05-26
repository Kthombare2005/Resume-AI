import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar/Sidebar';
import Landing from './components/Landing';
import Background from './components/Background';
import Auth from './components/Auth/Auth';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

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
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9ff' }}>
              <Background />
              <ProtectedRoute>
                <Sidebar />
              </ProtectedRoute>
              <Box
                component="main"
                sx={{
                  flexGrow: 1,
                  p: 3,
                  ml: { xs: 0, md: '280px' },
                  transition: 'margin 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/settings" 
                    element={
                      <ProtectedRoute>
                        <Settings />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/job-post" 
                    element={
                      <ProtectedRoute>
                        <div>Job Post Page (Coming Soon)</div>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/applied" 
                    element={
                      <ProtectedRoute>
                        <div>Applied Jobs Page (Coming Soon)</div>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/community" 
                    element={
                      <ProtectedRoute>
                        <div>Community Page (Coming Soon)</div>
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/messages" 
                    element={
                      <ProtectedRoute>
                        <div>Messages Page (Coming Soon)</div>
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Box>
            </Box>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
