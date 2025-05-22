import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box, Drawer, List, ListItem, Stack } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        background: 'transparent',
        boxShadow: 'none',
        border: 'none',
        width: '100%'
      }}
    >
      <Toolbar 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1400px',
          mx: 'auto',
          px: { xs: 2, sm: 4, md: 6 }
        }}
      >
        <Link 
          to="/"
          style={{ 
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Logo />
        </Link>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* <Button
              variant="contained"
              sx={{
                background: 'linear-gradient(45deg, #4361ee 30%, #3a0ca3 90%)',
                color: '#ffffff',
                fontWeight: 600,
                position: 'relative',
                overflow: 'hidden',
                px: 4,
                backdropFilter: 'none',
                '& .buttonText': {
                  position: 'relative',
                  zIndex: 2,
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(45deg, #3a0ca3 30%, #4361ee 90%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease-in-out',
                  zIndex: 1,
                },
                '&:hover': {
                  '&::before': {
                    opacity: 1,
                  },
                  '& .buttonText': {
                    color: '#ffffff',
                  },
                },
              }}
            >
              <span className="buttonText">Get Started</span>
            </Button> */}
          </motion.div>
        </Box>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ 
            display: { md: 'none' },
            color: '#1a1a1a'
          }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)'
          },
        }}
      >
        <List sx={{ pt: 2 }}>
          <ListItem sx={{ pt: 2 }}>
            <Stack sx={{ width: '100%' }}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  background: 'linear-gradient(45deg, #4361ee 30%, #3a0ca3 90%)',
                  color: '#ffffff',
                  fontWeight: 600,
                  py: 1,
                  position: 'relative',
                  overflow: 'hidden',
                  '& .buttonText': {
                    position: 'relative',
                    zIndex: 2,
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg, #3a0ca3 30%, #4361ee 90%)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease-in-out',
                    zIndex: 1,
                  },
                  '&:hover': {
                    '&::before': {
                      opacity: 1,
                    },
                    '& .buttonText': {
                      color: '#ffffff',
                    },
                  },
                }}
              >
                <span className="buttonText">Get Started</span>
              </Button>
            </Stack>
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar; 