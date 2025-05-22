import { Box } from '@mui/material';

const avatarData = [
  {
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    profileUrl: '#',
    name: 'John Doe'
  },
  {
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    profileUrl: '#',
    name: 'Sarah Smith'
  },
  {
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    profileUrl: '#',
    name: 'Michael Johnson'
  },
  {
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
    profileUrl: '#',
    name: 'Emily Brown'
  },
  {
    imageUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    profileUrl: '#',
    name: 'David Wilson'
  }
];

const AvatarCircles = ({ className, numPeople = 1000 }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        '& > a:not(:first-of-type)': {
          marginLeft: '-16px'
        }
      }}
      className={className}
    >
      {avatarData.map((avatar, index) => (
        <Box
          key={index}
          component="a"
          href={avatar.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            textDecoration: 'none',
            '& img': {
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid #fff',
              backgroundColor: '#fff',
              objectFit: 'cover',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)'
              }
            }
          }}
        >
          <img
            src={avatar.imageUrl}
            alt={`Avatar ${index + 1}`}
          />
        </Box>
      ))}
      {numPeople > 0 && (
        <Box
          component="a"
          href="#"
          sx={{
            textDecoration: 'none',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid #fff',
            backgroundColor: '#4361ee',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 600,
            transition: 'background-color 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#3a0ca3'
            }
          }}
        >
          +{numPeople}
        </Box>
      )}
    </Box>
  );
};

export default AvatarCircles; 