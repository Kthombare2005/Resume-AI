import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Stack,
  IconButton,
  Tooltip,
  LinearProgress,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Upload,
  Description,
  Work,
  Add,
  CloudUpload,
  TrendingUp,
  Assessment,
  Person,
  MenuBook,
  Speed,
  Settings,
  ExitToApp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as api from '../../services/api';

const Dashboard = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [userResumes, setUserResumes] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

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
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    handleClose();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const quickActions = [
    {
      icon: <Upload />,
      title: 'Upload Resume',
      description: 'Upload an existing resume',
      color: '#4361ee'
    },
    {
      icon: <Description />,
      title: 'Browse Templates',
      description: 'Choose from our templates',
      color: '#3a0ca3'
    },
    {
      icon: <Work />,
      title: 'Job Matching',
      description: 'Find matching jobs',
      color: '#4895ef'
    }
  ];

  const stats = [
    {
      icon: <Description />,
      value: '0',
      label: 'Total Resumes',
      color: '#4361ee'
    },
    {
      icon: <Work />,
      value: '0',
      label: 'Job Applications',
      color: '#3a0ca3'
    },
    {
      icon: <CloudUpload />,
      value: '0',
      label: 'Downloads',
      color: '#4895ef'
    },
    {
      icon: <TrendingUp />,
      value: '0%',
      label: 'Average Match Rate',
      color: '#4cc9f0'
    }
  ];

  return (
    <Container 
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      maxWidth="lg" 
      sx={{ 
        py: { xs: 6, md: 8 },
        mt: { xs: 2, md: 3 }
      }}
    >
      {/* Profile Section */}
      <Box
        component={motion.div}
        variants={itemVariants}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 4
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
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user?.email}
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
          >
            <MenuItem onClick={handleClose}>
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
        </Paper>
      </Box>

      {/* Welcome Section */}
      <Paper
        component={motion.div}
        variants={itemVariants}
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: 'linear-gradient(135deg, rgba(67, 97, 238, 0.1), rgba(58, 12, 163, 0.1))',
          borderRadius: 3,
          border: '1px solid rgba(67, 97, 238, 0.1)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mt: { xs: 3, md: 4 }
        }}
      >
        <Box>
          <Typography variant="h4" gutterBottom fontWeight="700">
            Welcome back, <span style={{ color: '#4361ee' }}>{user?.firstName || 'User'}</span>!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 2, md: 0 } }}>
            Let's optimize your resume and boost your career opportunities.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{
            py: 1.5,
            px: 3,
            backgroundColor: '#4361ee',
            '&:hover': { backgroundColor: '#3a0ca3' },
            whiteSpace: 'nowrap'
          }}
        >
          Create New Resume
        </Button>
      </Paper>

      <Grid container spacing={4}>
        {/* Profile Completion */}
        <Grid item xs={12} md={4}>
          <Paper
            component={motion.div}
            variants={itemVariants}
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid rgba(67, 97, 238, 0.1)',
              borderRadius: 3
            }}
          >
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" gutterBottom fontWeight="600">
                  Profile Completion
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Complete your profile to get better job matches
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={30} 
                  sx={{
                    mt: 2,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#4361ee',
                      borderRadius: 4
                    }
                  }}
                />
              </Box>
              <Divider />
              <Stack spacing={2}>
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    startIcon={action.icon}
                    sx={{
                      py: 1.5,
                      justifyContent: 'flex-start',
                      borderColor: action.color,
                      color: action.color,
                      '&:hover': {
                        borderColor: action.color,
                        backgroundColor: `${action.color}10`,
                      },
                    }}
                  >
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography variant="body2" fontWeight="600">
                        {action.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {action.description}
                      </Typography>
                    </Box>
                  </Button>
                ))}
              </Stack>
            </Stack>
          </Paper>
        </Grid>

        {/* Recent Resumes */}
        <Grid item xs={12} md={8}>
          <Paper
            component={motion.div}
            variants={itemVariants}
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              border: '1px solid rgba(67, 97, 238, 0.1)',
              borderRadius: 3
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="600">
              Recent Resumes
            </Typography>
            {userResumes.length === 0 ? (
              <Box
                sx={{
                  py: 8,
                  textAlign: 'center',
                  backgroundColor: 'rgba(67, 97, 238, 0.02)',
                  borderRadius: 2,
                  border: '2px dashed rgba(67, 97, 238, 0.1)'
                }}
              >
                <CloudUpload
                  sx={{ fontSize: 48, color: '#4361ee', mb: 2, opacity: 0.5 }}
                />
                <Typography variant="h6" gutterBottom color="text.secondary">
                  No resumes yet
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  Upload your first resume or create a new one
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  sx={{
                    backgroundColor: '#4361ee',
                    '&:hover': { backgroundColor: '#3a0ca3' },
                  }}
                >
                  Create New Resume
                </Button>
              </Box>
            ) : (
              <Stack spacing={2}>
                {/* Resume items will be mapped here */}
              </Stack>
            )}
          </Paper>
        </Grid>

        {/* Statistics Section */}
        <Grid item xs={12}>
          <Paper
            component={motion.div}
            variants={itemVariants}
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid rgba(67, 97, 238, 0.1)',
              borderRadius: 3
            }}
          >
            <Typography variant="h6" gutterBottom fontWeight="600">
              Resume Statistics
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {stats.map((stat, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      backgroundColor: `${stat.color}05`,
                      borderRadius: 2,
                      border: `1px solid ${stat.color}20`
                    }}
                  >
                    <IconButton
                      sx={{
                        backgroundColor: `${stat.color}10`,
                        color: stat.color,
                        '&:hover': { backgroundColor: `${stat.color}20` }
                      }}
                    >
                      {stat.icon}
                    </IconButton>
                    <Box>
                      <Typography variant="h4" fontWeight="700" color={stat.color}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 