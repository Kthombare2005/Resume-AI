import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Box,
  Avatar,
  IconButton,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import {
  Person,
  Edit,
  Save,
  ArrowBack
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Settings = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Only include password fields if they're filled
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      };

      if (formData.currentPassword && formData.newPassword) {
        if (formData.newPassword !== formData.confirmNewPassword) {
          setError('New passwords do not match');
          setLoading(false);
          return;
        }
        updateData.currentPassword = formData.currentPassword;
        updateData.newPassword = formData.newPassword;
      }

      const response = await api.updateProfile(updateData);
      if (response.success) {
        setUser(response.user);
        setSuccess('Profile updated successfully');
        setIsEditing(false);
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        }));
      }
    } catch (error) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          border: '1px solid rgba(67, 97, 238, 0.1)',
        }}
      >
        {/* Header */}
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 4 }}>
          <IconButton
            onClick={() => navigate('/dashboard')}
            sx={{ 
              color: '#4361ee',
              '&:hover': { backgroundColor: 'rgba(67, 97, 238, 0.04)' }
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h5" fontWeight="600">
            Profile Settings
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant={isEditing ? "contained" : "outlined"}
            startIcon={isEditing ? <Save /> : <Edit />}
            onClick={() => isEditing ? handleSubmit() : setIsEditing(true)}
            sx={{
              backgroundColor: isEditing ? '#4361ee' : 'transparent',
              '&:hover': {
                backgroundColor: isEditing ? '#3a0ca3' : 'rgba(67, 97, 238, 0.04)'
              }
            }}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </Stack>

        {/* Alerts */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* Avatar Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: '#4361ee',
                  fontSize: '2rem'
                }}
              >
                {user?.firstName?.[0]?.toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6" gutterBottom>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user?.email}
                </Typography>
              </Box>
            </Box>

            <Divider />

            {/* Personal Information */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Personal Information
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Stack>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
            />

            {/* Password Change Section */}
            {isEditing && (
              <>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Change Password
                </Typography>
                <TextField
                  fullWidth
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={formData.currentPassword}
                  onChange={handleChange}
                />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    type="password"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                  />
                </Stack>
              </>
            )}
          </Stack>
        </form>

        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Settings; 