import React from 'react';
import { Box } from '@mui/material';

const Background = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        background: 'linear-gradient(135deg, #f5f7ff 0%, #f1f3ff 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 15% 50%, rgba(67, 97, 238, 0.05) 0%, transparent 25%),
            radial-gradient(circle at 85% 30%, rgba(58, 12, 163, 0.05) 0%, transparent 25%)
          `,
          opacity: 0.8
        }
      }}
    />
  );
};

export default Background; 