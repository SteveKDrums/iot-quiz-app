import { createTheme } from '@mui/material/styles';
import { blue, deepPurple, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: { main: deepPurple[500], contrastText: '#fff' },
    secondary: { main: blue[300], contrastText: '#000' },
    neutral:   { main: grey[600],  contrastText: '#fff' },
    background:{ default: '#F2EFEA', paper: '#FFFFFF' }
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily: '"Google Sans","Roboto",sans-serif',
    h1: { fontSize: '2.125rem', fontWeight: 600 },
    h2: { fontSize: '1.5rem',   fontWeight: 500 },
    h4: { fontSize: '1.125rem', fontWeight: 500 },
    subtitle1:{ fontSize: '1rem' },
    body1:    { fontSize: '0.875rem' },
    button:   { textTransform: 'none', fontWeight: 600 }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: { body: { backgroundColor: '#F2EFEA' } }
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 16 } }
    },
    MuiCard: {
      defaultProps: { elevation: 4 },
      styleOverrides: { root: { borderRadius: 16 } }
    },
    MuiPaper: {
      styleOverrides: { root: { padding: '24px', borderRadius: 16 } }
    }
  },
  spacing: 8
});

export default theme;
