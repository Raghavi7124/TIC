import React from 'react';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import ChatWindow from './components/ChatWindow';

function App() {

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#74C1E1' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Thunai - Your Mental Health Companion
          </Typography>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ flex: 1, display: 'flex', flexDirection: 'column', py: 2 }}>
        <ChatWindow />
      </Container>
    </Box>
  );
}

export default App;

