import { Box, Typography, Avatar } from '@mui/material';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "Tech Corp",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    text: "ResumeAI helped me land my dream job! The AI suggestions were spot-on and really improved my resume's impact."
  },
  {
    name: "Michael Chen",
    role: "Product Manager",
    company: "Innovation Labs",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    text: "The ATS optimization feature is a game-changer. My resume now gets through every application system seamlessly."
  },
  {
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Creative Solutions",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    text: "I was amazed by how quickly ResumeAI analyzed my resume and provided actionable improvements."
  },
  {
    name: "David Kim",
    role: "Data Scientist",
    company: "Data Dynamics",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    text: "The job description matching feature saved me hours of manual work. Highly recommended!"
  },
  {
    name: "Lisa Thompson",
    role: "UX Designer",
    company: "Design Studio",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    text: "ResumeAI's suggestions helped me highlight my achievements in a much more impactful way."
  },
  {
    name: "James Wilson",
    role: "Business Analyst",
    company: "Strategy Corp",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    text: "The instant feedback and professional suggestions made updating my resume a breeze."
  }
];

const TestimonialCard = ({ testimonial }) => (
  <Box
    sx={{
      background: '#fff',
      borderRadius: '16px',
      p: 4,
      width: '400px',
      flexShrink: 0,
      mx: 3,
      boxShadow: '0 4px 24px rgba(67, 97, 238, 0.1)',
      border: '1px solid rgba(67, 97, 238, 0.1)',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 32px rgba(67, 97, 238, 0.15)',
      }
    }}
  >
    <Box sx={{ mb: 3 }}>
      <Typography
        sx={{
          fontSize: '1.1rem',
          lineHeight: 1.6,
          color: '#444',
          fontStyle: 'italic',
          mb: 3
        }}
      >
        "{testimonial.text}"
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar
          src={testimonial.image}
          alt={testimonial.name}
          sx={{ width: 48, height: 48 }}
        />
        <Box>
          <Typography
            sx={{
              fontWeight: 600,
              color: '#1a1a1a',
              fontSize: '1rem'
            }}
          >
            {testimonial.name}
          </Typography>
          <Typography
            sx={{
              color: '#666',
              fontSize: '0.875rem'
            }}
          >
            {testimonial.role} at {testimonial.company}
          </Typography>
        </Box>
      </Box>
    </Box>
  </Box>
);

const Testimonials = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        width: '100vw',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        background: 'linear-gradient(180deg, rgba(67, 97, 238, 0.03) 0%, rgba(58, 12, 163, 0.03) 100%)',
      }}
    >
      <Typography
        variant="h2"
        align="center"
        sx={{
          fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
          fontWeight: 700,
          mb: 2,
          color: '#1a1a1a'
        }}
      >
        What Our Clients Say
      </Typography>
      <Typography
        align="center"
        sx={{
          mb: 8,
          color: '#666666',
          maxWidth: '600px',
          mx: 'auto',
          fontSize: { xs: '1rem', sm: '1.1rem' }
        }}
      >
        Join thousands of satisfied professionals who transformed their careers with ResumeAI
      </Typography>

      <Box 
        sx={{ 
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            width: '15%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(67, 97, 238, 0.03) 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none'
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            right: 0,
            top: 0,
            width: '15%',
            height: '100%',
            background: 'linear-gradient(-90deg, rgba(67, 97, 238, 0.03) 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none'
          }
        }}
      >
        <Box
          component={motion.div}
          animate={{
            x: [0, -2880],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          sx={{
            display: 'flex',
            width: 'max-content',
            gap: 3,
            py: 4,
          }}
        >
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Testimonials; 