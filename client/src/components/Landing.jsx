import { Button, Container, Typography, Box, Grid, Paper, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { Assessment, WorkspacePremium, Speed, People, TrendingUp, Timer, AutoFixHigh, Description, Score, Lightbulb, Settings, Edit } from '@mui/icons-material';
import AvatarCircles from './AvatarCircles';
import { BentoGrid, BentoCard } from './BentoGrid';
import Testimonials from './Testimonials';

const Landing = () => {
  const features = [
    {
      icon: <Assessment sx={{ fontSize: 24, color: '#4361ee' }} />,
      title: 'Smart Resume Analysis',
      description: 'AI-powered resume analysis with job description matching and role-fit scoring.',
      tag: '98% Match Rate',
      className: 'col-span-1',
      background: (
        <Box
          sx={{
            background: 'radial-gradient(circle at 50% 50%, rgba(67, 97, 238, 0.1) 0%, transparent 50%)',
            width: '100%',
            height: '100%',
            transform: 'scale(2)',
            opacity: 0.5
          }}
        />
      )
    },
    {
      icon: <Settings sx={{ fontSize: 24, color: '#4361ee' }} />,
      title: 'ATS Optimization',
      description: 'Ensure your resume passes ATS systems with format checking and keyword optimization.',
      tag: '100% ATS-Friendly',
      className: 'col-span-1',
      background: (
        <Box
          sx={{
            background: 'linear-gradient(45deg, rgba(67, 97, 238, 0.1) 0%, transparent 100%)',
            width: '100%',
            height: '100%'
          }}
        />
      )
    },
    {
      icon: <Description sx={{ fontSize: 24, color: '#4361ee' }} />,
      title: 'Job Description Insights',
      description: 'Extract key requirements and skills from job descriptions instantly.',
      tag: 'Quick Analysis',
      className: 'col-span-1',
      background: (
        <Box
          sx={{
            background: 'linear-gradient(-45deg, rgba(67, 97, 238, 0.1) 0%, transparent 100%)',
            width: '100%',
            height: '100%'
          }}
        />
      )
    },
    {
      icon: <Edit sx={{ fontSize: 24, color: '#4361ee' }} />,
      title: 'AI-Powered Suggestions',
      description: 'Get smart suggestions to improve phrasing and content of your resume.',
      tag: 'Smart Edits',
      className: 'col-span-1',
      background: (
        <Box
          sx={{
            background: 'radial-gradient(circle at 50% 0%, rgba(67, 97, 238, 0.1) 0%, transparent 50%)',
            width: '100%',
            height: '100%',
            transform: 'scale(2)',
            opacity: 0.5
          }}
        />
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const highlightVariants = {
    hidden: { 
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Container 
      maxWidth="lg" 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        pt: { xs: '80px', md: '100px' },
        pb: { xs: '40px', md: '60px' },
        minHeight: '100%',
        position: 'relative',
        zIndex: 1
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Hero Section */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: { xs: 6, md: 8 },
            maxWidth: '800px',
            mx: 'auto',
            position: 'relative',
            mt: { xs: 2, md: 4 }
          }}
        >
          {/* Animated Background Illustration */}
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '150%',
              height: '150%',
              zIndex: -1,
              opacity: 0.06,
              pointerEvents: 'none'
            }}
          >
            <motion.svg
              viewBox="0 0 1000 1000"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: '100%', height: '100%' }}
            >
              <motion.path
                d="M100,100 L900,100 L900,900 L100,900 Z"
                fill="none"
                stroke="#4361ee"
                strokeWidth="1"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
              />
              <motion.path
                d="M200,200 L800,200 L800,800 L200,800 Z"
                fill="none"
                stroke="#3a0ca3"
                strokeWidth="1"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
              />
              <motion.path
                d="M0,0 L1000,1000"
                fill="none"
                stroke="#4361ee"
                strokeWidth="0.5"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
              />
              <motion.path
                d="M1000,0 L0,1000"
                fill="none"
                stroke="#3a0ca3"
                strokeWidth="0.5"
                variants={pathVariants}
                initial="hidden"
                animate="visible"
              />
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.path
                  key={`grid-h-${i}`}
                  d={`M0,${i * 100} L1000,${i * 100}`}
                  fill="none"
                  stroke="#4361ee"
                  strokeWidth="0.2"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
              ))}
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.path
                  key={`grid-v-${i}`}
                  d={`M${i * 100},0 L${i * 100},1000`}
                  fill="none"
                  stroke="#3a0ca3"
                  strokeWidth="0.2"
                  variants={pathVariants}
                  initial="hidden"
                  animate="visible"
                />
              ))}
            </motion.svg>
          </Box>

          <motion.div variants={itemVariants}>
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'transparent',
                background: 'linear-gradient(45deg, #4361ee 30%, #3a0ca3 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.75rem' },
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                textAlign: 'center',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(45deg, #4361ee 30%, #3a0ca3 90%)',
                  borderRadius: '2px'
                }
              }}
            >
              Transform Your Career Journey with AI
            </Typography>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ 
                mb: 4,
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                lineHeight: 1.6,
                color: '#666666',
                textAlign: 'center',
                fontWeight: 500,
                '& strong': {
                  color: '#4361ee',
                  fontWeight: 600
                }
              }}
            >
              Your resume is more than a document—it's your <strong>professional story</strong>. Let our AI-powered platform help you tell it with impact.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 2, sm: 3 }}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                component={RouterLink}
                to="/auth"
                variant="contained"
                size="large"
                sx={{
                  fontSize: '1.1rem',
                  py: 1.5,
                  px: 4,
                  backgroundColor: '#4361ee',
                  '&:hover': {
                    backgroundColor: '#3a0ca3',
                  },
                  fontWeight: 600,
                  borderRadius: '8px',
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(67, 97, 238, 0.3)',
                }}
              >
                Get Started
              </Button>
              <Button
                component={RouterLink}
                to="/demo"
                variant="outlined"
                size="large"
                sx={{
                  fontSize: '1rem',
                  py: 1.5,
                  px: 4,
                  borderColor: '#4361ee',
                  color: '#4361ee',
                  '&:hover': {
                    borderColor: '#3a0ca3',
                    color: '#3a0ca3',
                    backgroundColor: 'rgba(67, 97, 238, 0.04)',
                  },
                  fontWeight: 600,
                  borderRadius: '8px',
                  textTransform: 'none',
                  borderWidth: '2px',
                }}
              >
                Watch Demo
              </Button>
            </Stack>
          </motion.div>

          {/* Trusted By Section */}
          <motion.div 
            variants={itemVariants}
            style={{ marginTop: '48px' }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                textAlign: 'center',
                color: '#666666',
                mb: 2,
                fontSize: '0.95rem'
              }}
            >
              Trusted by professionals from leading companies
            </Typography>
            <Stack
              direction="column"
              alignItems="center"
              spacing={2}
            >
              <AvatarCircles numPeople={1000} />
              <Typography
                variant="caption"
                sx={{
                  color: '#666666',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: '0.85rem'
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    color: '#4361ee', 
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  1000+
                </Box>
                professionals have optimized their resumes with us
              </Typography>
            </Stack>
          </motion.div>
        </Box>

        {/* Features Section */}
        <Box 
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          sx={{ 
            py: { xs: 8, md: 12 },
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '100%',
              background: 'linear-gradient(180deg, rgba(67, 97, 238, 0.05) 0%, transparent 100%)',
              backgroundImage: `
                radial-gradient(circle at 100% 0%, rgba(67, 97, 238, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 0% 0%, rgba(58, 12, 163, 0.1) 0%, transparent 50%)
              `,
              zIndex: -1
            }
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.2 }}
            >
              <Typography
                variant="h2"
                align="center"
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  color: '#4361ee',
                }}
              >
                Why Choose ResumeAI?
              </Typography>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  mb: 8,
                  color: '#666666',
                  maxWidth: '800px',
                  mx: 'auto',
                  fontSize: { xs: '1rem', sm: '1.1rem' }
                }}
              >
                Transform your resume with our AI-powered tools
              </Typography>
            </motion.div>

            <Box sx={{ px: { xs: 2, md: 4 } }}>
              <BentoGrid>
                {features.map((feature, idx) => (
                  <BentoCard
                    key={idx}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    tag={feature.tag}
                    className={feature.className}
                    background={feature.background}
                  />
                ))}
              </BentoGrid>
            </Box>
          </Container>
        </Box>

        {/* How It Works Section */}
        <Box 
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, margin: "-100px" }}
          key="how-it-works-section"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                when: "beforeChildren"
              }
            }
          }}
          sx={{ 
            py: { xs: 8, md: 12 },
            position: 'relative'
          }}
        >
          <Container maxWidth="md">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut"
                  }
                }
              }}
            >
              <Typography
                variant="h2"
                align="center"
                sx={{
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 2,
                  background: 'linear-gradient(45deg, #4361ee 30%, #3a0ca3 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                How It Works
              </Typography>
              <Typography
                variant="h6"
                align="center"
                sx={{
                  mb: 8,
                  color: '#666666',
                  maxWidth: '800px',
                  mx: 'auto',
                  fontSize: { xs: '1rem', sm: '1.1rem' }
                }}
              >
                Three simple steps to transform your resume
              </Typography>
            </motion.div>

            <Box
              component={motion.div}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.3,
                    delayChildren: 0.2,
                    when: "beforeChildren"
                  }
                }
              }}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                maxWidth: '700px',
                mx: 'auto',
                position: 'relative'
              }}
            >
              {/* Vertical line with animation */}
              <motion.div
                variants={{
                  hidden: { 
                    scaleY: 0,
                    originY: 0
                  },
                  visible: { 
                    scaleY: 1,
                    transition: {
                      duration: 1,
                      ease: "easeInOut"
                    }
                  }
                }}
                style={{
                  position: 'absolute',
                  left: '32px',
                  top: '40px',
                  bottom: '40px',
                  width: '2px',
                  background: 'linear-gradient(180deg, rgba(67, 97, 238, 0.2) 0%, rgba(58, 12, 163, 0.2) 100%)',
                  zIndex: 0,
                  transformOrigin: 'top'
                }}
              />

              {[
                {
                  step: '01',
                  title: 'Upload Your Resume',
                  description: 'Simply upload your existing resume in any format (PDF, DOCX, etc.)',
                  icon: <Assessment sx={{ fontSize: 24, color: '#4361ee' }} />
                },
                {
                  step: '02',
                  title: 'AI Analysis',
                  description: 'Our AI analyzes your resume against job requirements and industry standards',
                  icon: <AutoFixHigh sx={{ fontSize: 24, color: '#4361ee' }} />
                },
                {
                  step: '03',
                  title: 'Get Recommendations',
                  description: 'Receive instant feedback and suggestions to optimize your resume',
                  icon: <Lightbulb sx={{ fontSize: 24, color: '#4361ee' }} />
                }
              ].map((step, index) => (
                <motion.div
                  key={`step-${index}`}
                  custom={index}
                  variants={{
                    hidden: { 
                      opacity: 0,
                      x: -20,
                      scale: 0.95
                    },
                    visible: i => ({
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        mass: 1,
                        delay: i * 0.2
                      }
                    })
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 3,
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    <motion.div
                      variants={{
                        hidden: { 
                          scale: 0,
                          rotate: -180
                        },
                        visible: { 
                          scale: 1,
                          rotate: 0,
                          transition: {
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                          }
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: { xs: 48, md: 64 },
                          height: { xs: 48, md: 64 },
                          borderRadius: '50%',
                          backgroundColor: '#fff',
                          border: '2px solid rgba(67, 97, 238, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontSize: { xs: '1.25rem', md: '1.5rem' },
                          fontWeight: 700,
                          color: '#4361ee',
                          boxShadow: '0 4px 12px rgba(67, 97, 238, 0.1)'
                        }}
                      >
                        {step.step}
                      </Box>
                    </motion.div>

                    <Box>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { 
                            opacity: 1, 
                            y: 0,
                            transition: { duration: 0.5 }
                          }
                        }}
                      >
                        <Typography
                          variant="h5"
                          sx={{
                            mb: 1,
                            fontWeight: 600,
                            color: '#1a1a1a',
                            fontSize: { xs: '1.25rem', md: '1.5rem' }
                          }}
                        >
                          {step.title}
                        </Typography>
                      </motion.div>
                      <motion.div
                        variants={{
                          hidden: { opacity: 0, y: 10 },
                          visible: { 
                            opacity: 1, 
                            y: 0,
                            transition: { duration: 0.5, delay: 0.1 }
                          }
                        }}
                      >
                        <Typography
                          sx={{
                            color: '#666666',
                            lineHeight: 1.7,
                            fontSize: '1rem'
                          }}
                        >
                          {step.description}
                        </Typography>
                      </motion.div>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Replace Statistics & CTA Section with Testimonials */}
        <Testimonials />

        {/* CTA Button */}
        <Box 
          sx={{ 
            textAlign: 'center',
            mt: 2,
            mb: 0
          }}
        >
          <Typography
            component="div"
            sx={{
              textAlign: 'center',
              color: '#666666',
              fontSize: '1rem',
              fontWeight: 500,
              mt: 2,
              mb: 0,
              opacity: 0.9,
              padding: '8px 16px',
              borderRadius: '20px',
              background: 'linear-gradient(120deg, rgba(67, 97, 238, 0.05), rgba(58, 12, 163, 0.05))',
              display: 'inline-block',
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(67, 97, 238, 0.1)',
              '& a': {
                color: '#4361ee',
                textDecoration: 'none',
                fontWeight: 700,
                transition: 'all 0.2s ease',
                '&:hover': {
                  color: '#3a0ca3',
                  textDecoration: 'underline'
                }
              }
            }}
          >
            Crafted with ❤️ by <a href="https://linktr.ee/Kthombare?utm_source=linktree_admin_share" target="_blank" rel="noopener noreferrer">Ketan Thombare</a>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Landing; 