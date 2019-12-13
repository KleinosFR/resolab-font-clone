import React from "react";
import { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";

import HeaderSite from "./HeaderSite";
import HeaderIcons from "./HeaderIcons";
import { connect } from "react-redux";
import Axios from "axios";

import apiCallAuth from "../apiCallAuth";

function Header() {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <>
      <AppBar position="static" color="primary">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid container item xs={6} sm={10}>
            <HeaderSite />
          </Grid>
          <Grid item xs={6} sm={2}>
            {isLogged && <HeaderIcons />}
          </Grid>
        </Grid>
      </AppBar>
    </>
  );
}

export default connect()(Header);