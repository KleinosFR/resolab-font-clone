import React from "react";
import Grid from "@material-ui/core/Grid";

import logo from "../Assets/resolab-simple-white.png";

export default function HeaderSite() {
  return (
    <Grid item xs={9}>
      <img
        src={logo}
        width="170px"
        alt="RésoLab-logo"
        style={{ padding: "8px" }}
      />
      <h1
        style={{
          fontSize: "12px",
          marginTop: "-20px",
          padding: "8px",
          fontFamily: "Roboto"
        }}
      >
        Le réseau social pour expérimenter
      </h1>
    </Grid>
  );
}
