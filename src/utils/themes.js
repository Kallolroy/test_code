import { createMuiTheme } from '@material-ui/core/styles';

export const themeLoginHome = createMuiTheme({
  shadows: ['none'],
  palette: {
    type: 'dark',
  },
  typography: {
    h6: {
      fontSize: 24,
    },
    caption: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    },
  },
});

export const themeLoginContainer = createMuiTheme({
  shadows: ['none'],
  palette: {
    primary: {
      light: '#880e4f',
      main: '#f18e00',
      // dark: will be calculated from palette.primary.main,
      contrastText: '#fff',
    },
    secondary: {
      light: '#2e7d32',
      main: '#ffb74d',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#fff',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

export const theme = createMuiTheme({
  shadows: ['none'],
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#263238',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#ffffff',
      main: '#f18e00',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0,0,0,0.87)',
      secondary: 'rgba(0,0,0,0.54)',
    },
    border: {
      primary: 'rgba(0, 0, 0, 0.12)',
      secondary: 'rgba(0, 0, 0, 0.23)',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    // type: 'dark',
  },
  typography: {
    h6: {
      fontSize: 20,
      fontWeight: 500,
      color: 'rgba(0,0,0,0.87)',
    },
    paragraph: {
      fontWeight: 500,
      fontSize: 16,
    },
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 400,
      fontSize: 12,
    },
    body2: {
      fontSize: 14,
      paddingTop: 11,
      paddingBottom: 11,
      paddingLeft: 5,
      fontWeight: '500',
    },
    button: {
      textTransform: 'none',
    },
  },
  overrides: {
    MuiButton: {
      root: { height: 44 },
      containedSecondary: {
        fontSize: '15px',
        fontWeight: '500',
        color: 'rgba(255,255,255,1)',
        backgroundColor: '#f18e00',
        textTransform: 'uppercase',
        padding: '8px 22px',
        borderRadius: '4px',
        border: '1px solid #f18e00',
        '&.Mui-disabled': {
          borderColor: 'rgba(0, 0, 0, 0.12)'  
        }
      },
      outlinedSecondary: {
        fontSize: '15px',
        fontWeight: '500',
        color: 'rgba(0,0,0,0.87)',
        background: '#ffffff',
        textTransform: 'uppercase',
        padding: '8px 22px',
        borderRadius: '4px',
        border: '1px solid rgba(0, 0, 0, 0.23)',
      },
    },
  },
});
