import React from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";

import HeaderSite from "./HeaderSite";
import HeaderIcons from "./HeaderIcons";
import { connect } from "react-redux";

import "../Layout/Scroll.css";

function Header({ isAuth }) {
  return (
    <AppBar color="primary" position="fixed">
      <Grid container spacing={3} alignItems="center">
        <HeaderSite />
        {isAuth && <HeaderIcons />}
      </Grid>
    </AppBar>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.isAuth
  };
};

export default connect(mapStateToProps)(Header);
