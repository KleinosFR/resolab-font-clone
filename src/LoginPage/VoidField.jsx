import React from "react";
import { Grid, Typography } from "@material-ui/core";

function VoidField({ isVoid, fieldName }) {
  return (
    <Grid item>
      {isVoid ? (
        <Typography color="error" align="center">
          Attention, tu as oublié de saisir ton {fieldName}. <br />
          Remplis ton {fieldName}, et essaie à nouveau
        </Typography>
      ) : (
        <></>
      )}
    </Grid>
  );
}

export default VoidField;
