import {
  CSSObject,
  Theme,
  ThemeProvider,
  createTheme,
  styled,
} from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2D3663",
    },
    secondary: {
      light: "#47ccc880",
      main: "#47ccc8",
      dark: "#29aeaa",
      contrastText: "#72D9D6",
    },
    error: {
      main: "#dc4545",
    },
  },
});