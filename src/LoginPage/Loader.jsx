import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";

function Loader({ isLoading }) {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        {isLoading ? <CircularProgress color="secondary" /> : <></>}
      </Grid>
    </Grid>
  );
}

export default Loader;
