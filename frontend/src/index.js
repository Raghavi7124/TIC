import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App';

const theme = createTheme({
  palette: {
    primary: {
      main: '#52B0AD', // Calming Teal
      dark: '#418281', // Accent Teal
      light: '#74C1E1', // Supportive Blue
    },
    secondary: {
      main: '#C9C1D9', // Warm Lavender
      light: '#C4E8A9', // Light Green
    },
    background: {
      default: '#F0F0F0', // Subtle Gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333', // Text Black
      secondary: '#418281', // Accent Teal
    },
    grey: {
      100: '#F0F0F0', // Subtle Gray
    },
  },
  typography: {
    fontFamily: 'Poppins, Roboto, Arial, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

