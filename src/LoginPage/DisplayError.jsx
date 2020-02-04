import React from "react";
import { Grid, Typography } from "@material-ui/core";

function DisplayError({ isError }) {
  if (isError) {
    return (
      <Grid item>
        <Typography color="error" align="center">
          Il y a eu un soucis.
          <br />
          Verifie ton nom d'utilisateur et ton mot de passe.
        </Typography>
      </Grid>
    );
  } else {
    return null;
  }
}

export default DisplayError;
