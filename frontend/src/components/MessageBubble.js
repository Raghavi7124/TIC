import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { Person, SmartToy } from '@mui/icons-material';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 1,
        alignItems: 'flex-start',
        gap: 1
      }}
    >
      {/* Avatar */}
      {!isUser && (
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: '#52B0AD', // Calming Teal
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            mt: 0.5
          }}
        >
          <SmartToy sx={{ color: 'white', fontSize: 20 }} />
        </Box>
      )}

      {/* Message Content */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '70%',
          backgroundColor: isUser ? '#52B0AD' : 'white', // Calming Teal for user messages
          color: isUser ? 'white' : 'text.primary',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          wordWrap: 'break-word',
          position: 'relative'
        }}
      >
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {message.text}
        </Typography>
        
        {/* Timestamp */}
        <Typography 
          variant="caption" 
          sx={{ 
            display: 'block', 
            mt: 1, 
            opacity: 0.7,
            fontSize: '0.7rem'
          }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Typography>
      </Paper>

      {/* User Avatar */}
      {isUser && (
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: '#C9C1D9', // Warm Lavender
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            mt: 0.5
          }}
        >
          <Person sx={{ color: 'white', fontSize: 20 }} />
        </Box>
      )}
    </Box>
  );
};

export default MessageBubble;