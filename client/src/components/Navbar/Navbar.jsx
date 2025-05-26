import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Divider,
  Tooltip,
  Paper
} from '@mui/material';
import {
  Settings,
  ExitToApp,
  Person
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
import * as api from '../../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const isDashboard = location.pathname === '/dashboard';

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      setUser(null);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    handleClose();
  };

  const handleSettings = () => {
    handleClose();
    navigate('/settings');
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: 'white',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
        {/* Logo */}
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            cursor: 'pointer'
          }}
          onClick={() => navigate('/dashboard')}
        >
          <img 
            src="/logo.png" 
            alt="ResumeAI" 
            style={{ 
              height: '32px',
              marginRight: '8px'
            }} 
          />
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#4361ee',
              fontWeight: 600,
              fontSize: '1.25rem'
            }}
          >
            ResumeAI
          </Typography>
        </Box>

        {/* User Profile Section */}
        {user && (
          <>
            {isDashboard ? (
              <Box
                component={motion.div}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    borderRadius: 3,
                    border: '1px solid rgba(67, 97, 238, 0.1)',
                    background: 'rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle1" fontWeight="600">
                      {user.firstName} {user.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                  <Tooltip title="Profile Settings">
                    <IconButton
                      onClick={handleProfileClick}
                      sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#4361ee',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#3a0ca3',
                        },
                      }}
                    >
                      <Person />
                    </IconButton>
                  </Tooltip>
                </Paper>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      border: '1px solid rgba(67, 97, 238, 0.1)',
                    }
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={handleSettings}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Settings fontSize="small" />
                      <Typography>Settings</Typography>
                    </Stack>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{ color: '#f44336' }}>
                      <ExitToApp fontSize="small" />
                      <Typography>Logout</Typography>
                    </Stack>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  backgroundColor: 'rgba(67, 97, 238, 0.05)',
                  py: 1,
                  px: 2,
                  borderRadius: 2,
                  cursor: 'pointer'
                }}
                onClick={() => navigate('/settings')}
              >
                <Box sx={{ textAlign: 'right' }}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      color: 'black',
                      fontWeight: 500,
                      lineHeight: 1.2
                    }}
                  >
                    {user.firstName} {user.lastName}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary',
                      fontSize: '0.75rem'
                    }}
                  >
                    {user.email}
                  </Typography>
                </Box>
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32,
                    bgcolor: '#4361ee',
                    color: 'white',
                    fontSize: '1rem',
                    fontWeight: 500
                  }}
                >
                  {user.firstName?.[0]?.toUpperCase()}
                </Avatar>
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 