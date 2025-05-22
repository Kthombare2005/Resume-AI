import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const BentoGrid = ({ children }) => {
  return (
    <Box
      component={motion.div}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.2 }}
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(2, 1fr)'
        },
        gap: 3,
        maxWidth: '1200px',
        mx: 'auto',
        width: '100%'
      }}
    >
      {children}
    </Box>
  );
};

export const BentoCard = ({ 
  icon: Icon, 
  title, 
  description, 
  tag, 
  className,
  background,
  bgColor = 'rgba(67, 97, 238, 0.04)'
}) => {
  return (
    <motion.div
      className={className}
      variants={item}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#fff',
          border: '1px solid rgba(67, 97, 238, 0.1)',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.03)',
          transition: 'all 0.3s ease',
          height: '100%',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(67, 97, 238, 0.12)',
            border: '1px solid rgba(67, 97, 238, 0.2)',
          }
        }}
      >
        {/* Decorative dots */}
        <Box
          sx={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            gap: '6px',
            zIndex: 2
          }}
        >
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FF5F57' }} />
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#FFBD2E' }} />
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#28C840' }} />
        </Box>

        {/* Background Element */}
        {background && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.5,
              transition: 'all 0.3s ease',
              zIndex: 1
            }}
          >
            {background}
          </Box>
        )}

        <Box 
          sx={{ 
            p: 3,
            pt: 5,
            backgroundColor: bgColor,
            position: 'relative',
            zIndex: 2,
            height: '100%'
          }}
        >
          <Box 
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2
            }}
          >
            <Box 
              sx={{ 
                width: 40,
                height: 40,
                borderRadius: '12px',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(67, 97, 238, 0.1)',
              }}
            >
              {Icon}
            </Box>
            {tag && (
              <Box 
                sx={{ 
                  px: 2,
                  py: 0.75,
                  borderRadius: '20px',
                  backgroundColor: '#fff',
                  color: '#4361ee',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  boxShadow: '0 2px 8px rgba(67, 97, 238, 0.1)',
                }}
              >
                {tag}
              </Box>
            )}
          </Box>
          <Box
            component="h3"
            sx={{
              fontWeight: 600,
              color: '#1a1a1a',
              mb: 1,
              fontSize: '1.125rem'
            }}
          >
            {title}
          </Box>
          <Box
            component="p"
            sx={{
              color: '#666666',
              lineHeight: 1.6,
              fontSize: '0.9375rem',
              m: 0
            }}
          >
            {description}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}; 