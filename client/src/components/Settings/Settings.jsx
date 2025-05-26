import React from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Container
      component={motion.div}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      maxWidth="md"
      sx={{
        py: { xs: 6, md: 8 },
        mt: { xs: 2, md: 3 }
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 4,
          border: '1px solid rgba(67, 97, 238, 0.1)',
          borderRadius: 3
        }}
      >
        <Typography variant="h5" gutterBottom fontWeight="600">
          Account Settings
        </Typography>
        <Divider sx={{ my: 3 }} />
        
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight="600">
              Personal Information
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="First Name"
                defaultValue={user?.firstName}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Last Name"
                defaultValue={user?.lastName}
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Email"
                defaultValue={user?.email}
                variant="outlined"
                disabled
              />
            </Stack>
          </Box>

          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight="600">
              Change Password
            </Typography>
            <Stack spacing={2}>
              <TextField
                fullWidth
                label="Current Password"
                type="password"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="New Password"
                type="password"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                variant="outlined"
              />
            </Stack>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
            >
              Save Changes
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Settings; 