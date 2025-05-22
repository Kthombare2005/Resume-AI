import React, { useState } from 'react';
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
} from '@mui/material';
import { motion } from 'framer-motion';
import { Google, GitHub, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import * as api from '../../services/api';

const Auth = ({ setUser }) => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignup) {
        // Validate required fields
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
          setError('Please fill in all required fields');
          setLoading(false);
          return;
        }

        // Validate password match
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        console.log('Attempting registration...');
        const response = await api.register(formData);
        console.log('Registration response:', response);
        
        if (response.success) {
          setUser(response.data);
          navigate('/dashboard');
        }
      } else {
        if (!formData.email || !formData.password) {
          setError('Please fill in all required fields');
          setLoading(false);
          return;
        }

        console.log('Attempting login...');
        const response = await api.login({ 
          email: formData.email, 
          password: formData.password 
        });
        console.log('Login response:', response);

        if (response.success) {
          console.log('Setting user state:', response.user);
          setUser(response.user);
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setError('');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    });
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
                <Stack direction="row" spacing={2}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    onChange={handleChange}
                    fullWidth
                    required
                  />
                </Stack>
              )}

              <TextField
                name="email"
                label="Email Address"
                onChange={handleChange}
                type="email"
                fullWidth
                required
              />

              <TextField
                name="password"
                label="Password"
                onChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
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
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  required
                />
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 2,
                  mb: 2,
                  backgroundColor: '#4361ee',
                  '&:hover': {
                    backgroundColor: '#3a0ca3',
                  },
                }}
              >
                {loading ? (
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