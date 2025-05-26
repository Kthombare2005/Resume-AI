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
  CircularProgress,
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
import { useAuth } from '../../contexts/AuthContext';
import * as api from '../../services/api';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If user is not available, show loading state
  if (!user) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

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

  return (
    <ErrorBoundary>
      <Container 
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        maxWidth="lg" 
        sx={{ 
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 }
        }}
      >
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
            gap: 2
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
            onClick={() => navigate('/create-resume')}
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
          {/* Quick Actions */}
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
              <Typography variant="h6" gutterBottom fontWeight="600">
                Quick Actions
              </Typography>
              <Stack spacing={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Upload />}
                  sx={{
                    py: 1.5,
                    justifyContent: 'flex-start',
                    color: '#4361ee',
                    borderColor: 'rgba(67, 97, 238, 0.5)',
                    '&:hover': {
                      borderColor: '#4361ee',
                      backgroundColor: 'rgba(67, 97, 238, 0.04)'
                    }
                  }}
                >
                  Upload Resume
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Description />}
                  sx={{
                    py: 1.5,
                    justifyContent: 'flex-start',
                    color: '#4361ee',
                    borderColor: 'rgba(67, 97, 238, 0.5)',
                    '&:hover': {
                      borderColor: '#4361ee',
                      backgroundColor: 'rgba(67, 97, 238, 0.04)'
                    }
                  }}
                >
                  Browse Templates
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Work />}
                  sx={{
                    py: 1.5,
                    justifyContent: 'flex-start',
                    color: '#4361ee',
                    borderColor: 'rgba(67, 97, 238, 0.5)',
                    '&:hover': {
                      borderColor: '#4361ee',
                      backgroundColor: 'rgba(67, 97, 238, 0.04)'
                    }
                  }}
                >
                  Job Matching
                </Button>
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
                  onClick={() => navigate('/create-resume')}
                  sx={{
                    backgroundColor: '#4361ee',
                    '&:hover': { backgroundColor: '#3a0ca3' },
                  }}
                >
                  Create New Resume
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Resume Statistics */}
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
              <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Description sx={{ fontSize: 40, color: '#4361ee', mb: 1 }} />
                    <Typography variant="h4" fontWeight="700" gutterBottom>
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Resumes
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Work sx={{ fontSize: 40, color: '#3a0ca3', mb: 1 }} />
                    <Typography variant="h4" fontWeight="700" gutterBottom>
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Job Applications
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <CloudUpload sx={{ fontSize: 40, color: '#4895ef', mb: 1 }} />
                    <Typography variant="h4" fontWeight="700" gutterBottom>
                      0
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Downloads
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <TrendingUp sx={{ fontSize: 40, color: '#4cc9f0', mb: 1 }} />
                    <Typography variant="h4" fontWeight="700" gutterBottom>
                      0%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Average Match Rate
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ErrorBoundary>
  );
};

export default Dashboard; 