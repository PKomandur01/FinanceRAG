// TypingIndicator.js
import React from 'react';
import { Box } from '@mui/material';

const TypingIndicator = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        padding: '10px',
      }}
    >
      <Box
        sx={{
          width: '8px',
          height: '8px',
          bgcolor: '#00bcd4',
          borderRadius: '50%',
          animation: 'typing-bounce 1s infinite ease-in-out',
          animationDelay: '0s',
        }}
      />
      <Box
        sx={{
          width: '8px',
          height: '8px',
          bgcolor: '#00bcd4',
          borderRadius: '50%',
          animation: 'typing-bounce 1s infinite ease-in-out',
          animationDelay: '0.2s',
        }}
      />
      <Box
        sx={{
          width: '8px',
          height: '8px',
          bgcolor: '#00bcd4',
          borderRadius: '50%',
          animation: 'typing-bounce 1s infinite ease-in-out',
          animationDelay: '0.4s',
        }}
      />
    </Box>
  );
};

export default TypingIndicator;
