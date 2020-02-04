import React from "react";

import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import blueGrey from "@material-ui/core/colors/blueGrey";

import Header from "./Header";
import Footer from "./Footer";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[900]
    }
  }
});

function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {children}
      <Footer />
    </ThemeProvider>
  );
}

export default Layout;
