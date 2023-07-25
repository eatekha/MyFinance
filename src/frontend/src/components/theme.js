import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea', // Customize the primary color here
    },
    secondary: {
      main: '#03a9f4', // Customize the secondary color here
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Customize the default font-family here
  },
  // You can add more customizations to the theme as needed
  // For example, setting up breakpoints, shadows, etc.
});

export default theme;
