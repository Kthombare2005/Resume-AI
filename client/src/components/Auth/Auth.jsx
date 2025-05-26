import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Stack,
  Alert,
  CircularProgress,
  InputLabel,
  OutlinedInput,
  FormControl,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Google, GitHub, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // Check URL parameters for signup mode
    const searchParams = new URLSearchParams(location.search);
    const mode = searchParams.get('mode');
    setIsSignup(mode === 'signup');
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      setIsLoading(true);
      
      if (isSignup) {
        // Validate phone number
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
          throw new Error('Please enter a valid 10-digit phone number');
        }

        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }

        // Split full name into first and last name for the register function
        const nameParts = formData.fullName.trim().split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(' ');

        await register({
          ...formData,
          firstName,
          lastName,
          phoneNumber: `+91${formData.phoneNumber}`,
        });
      } else {
        await login(formData);
      }
      
      // On successful authentication, redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle phone number input
    if (name === 'phoneNumber') {
      // Only allow numbers and limit to 10 digits
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData({ ...formData, [name]: sanitizedValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setError('');
    // Reset form data
    setFormData({
      fullName: '',
      phoneNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    // Update URL without reloading the page
    const newUrl = isSignup ? '/auth' : '/auth?mode=signup';
    window.history.pushState({}, '', newUrl);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Container 
      component="main" 
      maxWidth={false}
      disableGutters
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      <Box
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        sx={{
          width: '100%',
          maxWidth: '444px',
          mx: 2
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(67, 97, 238, 0.1)',
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            sx={{
              mb: 3,
              fontWeight: 700,
              background: 'linear-gradient(45deg, #4361ee 30%, #3a0ca3 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
            }}
          >
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {isSignup && (
                <>
                  <TextField
                    name="fullName"
                    label="Full Name"
                    required
                    fullWidth
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="phone-number">Contact Number</InputLabel>
                    <OutlinedInput
                      id="phone-number"
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      startAdornment={
                        <InputAdornment position="start">+91</InputAdornment>
                      }
                      label="Contact Number"
                      placeholder="Enter 10-digit number"
                    />
                  </FormControl>
                </>
              )}
              <TextField
                name="email"
                label="Email Address"
                required
                fullWidth
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
              <TextField
                name="password"
                label="Password"
                required
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {isSignup && (
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  required
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 2,
                  mb: 2,
                  background: 'linear-gradient(45deg, #4361ee 30%, #3a0ca3 90%)',
                  color: '#ffffff',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(45deg, #3a0ca3 30%, #4361ee 90%)',
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  isSignup ? 'Sign Up' : 'Sign In'
                )}
              </Button>
            </Stack>
          </form>

          <Divider sx={{ my: 2 }}>OR</Divider>

          <Stack spacing={2}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{
                borderColor: '#4361ee',
                color: '#4361ee',
                '&:hover': {
                  borderColor: '#3a0ca3',
                  backgroundColor: 'rgba(67, 97, 238, 0.04)',
                },
              }}
            >
              Continue with Google
            </Button>

            <Button
              fullWidth
              variant="outlined"
              startIcon={<GitHub />}
              sx={{
                borderColor: '#4361ee',
                color: '#4361ee',
                '&:hover': {
                  borderColor: '#3a0ca3',
                  backgroundColor: 'rgba(67, 97, 238, 0.04)',
                },
              }}
            >
              Continue with GitHub
            </Button>
          </Stack>

          <Button
            onClick={switchMode}
            fullWidth
            sx={{
              mt: 2,
              color: '#4361ee',
              '&:hover': {
                backgroundColor: 'transparent',
                color: '#3a0ca3',
              },
            }}
          >
            {isSignup
              ? 'Already have an account? Sign in'
              : "Don't have an account? Sign up"}
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Auth; 