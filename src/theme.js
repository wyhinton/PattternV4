import { red, deepOrange, grey } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[300],
      main: grey[500],
      dark: grey[900]
    },
    secondary: {
      main: deepOrange[500],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fafafa',
    },
  },
  shape: {
    borderRadius: 4,
    mediumRounding: 8
  },
  typography: {
    color: '#fafafa',
    fontFamily: 'VT323-Regular'

  }
});

export default theme;
