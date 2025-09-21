import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper } from '@mui/material';
import { Send } from '@mui/icons-material';

const InputBar = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 1 }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 1
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            }
          }}
        />
        <IconButton
          type="submit"
          color="primary"
          disabled={!message.trim()}
          sx={{
            backgroundColor: '#52B0AD', // Calming Teal
            color: 'white',
            '&:hover': {
              backgroundColor: '#418281', // Accent Teal
            },
            '&:disabled': {
              backgroundColor: '#F0F0F0', // Subtle Gray
              color: '#333333', // Text Black
            }
          }}
        >
          <Send />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default InputBar;

