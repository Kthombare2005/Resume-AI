import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as ResumeIcon,
  Work as JobIcon,
  Group as CommunityIcon,
  Message as MessageIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const DRAWER_WIDTH = 280;

const menuItems = [
  {
    title: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/dashboard'
  },
  {
    title: 'Job Post',
    icon: <ResumeIcon />,
    path: '/job-post'
  },
  {
    title: 'Applied',
    icon: <JobIcon />,
    path: '/applied'
  },
  {
    title: 'Community',
    icon: <CommunityIcon />,
    path: '/community'
  },
  {
    title: 'Message',
    icon: <MessageIcon />,
    path: '/messages'
  }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          border: 'none',
          backgroundColor: '#ffffff',
          boxShadow: '0px 0px 20px rgba(67, 97, 238, 0.05)',
        },
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        {/* <img 
          src="/logo.png" 
          alt="ResumeAI" 
          style={{ 
            height: '32px',
          }} 
        /> */}
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

      {/* Navigation Menu */}
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem 
              key={item.title}
              disablePadding
              sx={{ mb: 1 }}
            >
              <ListItemButton
                component={motion.div}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? '#4361ee' : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive ? '#4361ee' : 'rgba(67, 97, 238, 0.04)',
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: isActive ? '#fff' : '#666666',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#fff' : '#1a1a1a',
                      }}
                    >
                      {item.title}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* User Profile Section */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          borderTop: '1px solid rgba(0, 0, 0, 0.08)'
        }}
      >
        <ListItemButton
          component={motion.div}
          whileHover={{ x: 4 }}
          onClick={() => navigate('/settings')}
          sx={{
            borderRadius: 2,
            '&:hover': {
              backgroundColor: 'rgba(67, 97, 238, 0.04)',
            }
          }}
        >
          <Avatar
            src={user?.avatar}
            alt={user?.firstName}
            sx={{ 
              width: 32, 
              height: 32,
              bgcolor: '#4361ee',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 500
            }}
          >
            {user?.firstName?.[0]?.toUpperCase()}
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar; 