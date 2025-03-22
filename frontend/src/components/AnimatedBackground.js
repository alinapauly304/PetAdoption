import React from 'react';
import { Box, keyframes } from '@mui/material';

const float = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
  100% {
    transform: translateY(0) rotate(0deg);
  }
`;

function AnimatedBackground() {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)',
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {/* Floating pets */}
      <Box
        component="img"
        src="/images/dog1.png"
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '100px',
          height: '100px',
          opacity: 0.2,
          animation: `${float} 6s ease-in-out infinite`,
        }}
      />
      <Box
        component="img"
        src="/images/cat1.png"
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '80px',
          height: '80px',
          opacity: 0.15,
          animation: `${float} 8s ease-in-out infinite`,
        }}
      />
      <Box
        component="img"
        src="/images/dog2.png"
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '15%',
          width: '120px',
          height: '120px',
          opacity: 0.18,
          animation: `${float} 7s ease-in-out infinite`,
        }}
      />
      <Box
        component="img"
        src="/images/cat2.png"
        sx={{
          position: 'absolute',
          bottom: '25%',
          right: '20%',
          width: '90px',
          height: '90px',
          opacity: 0.12,
          animation: `${float} 9s ease-in-out infinite`,
        }}
      />
    </Box>
  );
}

export default AnimatedBackground; 