import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          duration: 0.5
        }}
      >
        <Box
          sx={{
            width: { xs: 32, sm: 36 },
            height: { xs: 32, sm: 36 },
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* Document shape */}
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundColor: '#4361ee',
              borderRadius: '6px',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '15%',
                left: '20%',
                width: '60%',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '1px'
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '35%',
                left: '20%',
                width: '40%',
                height: '2px',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                borderRadius: '1px'
              }
            }}
          >
            {/* Circuit lines */}
            <Box
              sx={{
                position: 'absolute',
                bottom: '20%',
                right: '15%',
                width: '45%',
                height: '45%',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '2px',
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '1px'
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  height: '2px',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '1px'
                }
              }}
            />
          </Box>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            background: 'linear-gradient(45deg, #4361ee 30%, #3a0ca3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}
        >
          Resume<span style={{ fontWeight: 800 }}>AI</span>
        </Typography>
      </motion.div>
    </Box>
  );
};

export default Logo; 