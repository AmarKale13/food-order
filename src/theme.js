// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6b00',  
    },
    secondary: {
      main: '#005f73',  
    },
    background: {
      default: '#f7f7f7',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", sans-serif',
    h5: { fontWeight: 600 },
  },
});

export default theme;
