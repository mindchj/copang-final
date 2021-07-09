import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#252525'
    },
  },
});
export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#eee'
    },
  },
});

