// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';

// ① Import MUI ThemeProvider and baseline styles
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// ② Import your custom theme
import theme from './theme';

import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
