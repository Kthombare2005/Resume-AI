import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Background = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #f0f4ff 0%, #ffffff 100%)',
      }}
    >
      {/* Main gradient background */}
      <motion.div
        animate={{
          opacity: [0.6, 0.4, 0.6],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(67, 97, 238, 0.15) 0%, transparent 60%), radial-gradient(circle at 70% 80%, rgba(58, 12, 163, 0.1) 0%, transparent 60%)',
        }}
      />

      {/* Grid pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(67, 97, 238, 0.08) 2px, transparent 2px),
            linear-gradient(90deg, rgba(67, 97, 238, 0.08) 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.8,
        }}
      />

      {/* Mouse follow glow effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(67, 97, 238, 0.2),
              rgba(67, 97, 238, 0.15) 15%,
              rgba(67, 97, 238, 0.08) 25%,
              transparent 60%)`,
            transition: 'opacity 0.15s ease',
          }
        }}
      />

      {/* Grid highlight effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(67, 97, 238, 0) 2px, transparent 2px),
            linear-gradient(90deg, rgba(67, 97, 238, 0) 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: `${mousePosition.x % 40}px ${mousePosition.y % 40}px`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(67, 97, 238, 0.25),
              rgba(67, 97, 238, 0.15) 25%,
              transparent 50%)`,
            transition: 'opacity 0.1s ease',
          }
        }}
      />

      {/* Subtle gradient overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(255, 255, 255, 0.2) 100%)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

export default Background; 