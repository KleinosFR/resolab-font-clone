import React from "react";
import { Typography, Grid, Avatar } from "@material-ui/core";
import Github from "../Assets/github-gradient.png";
import Linkedin from "../Assets/linkedin-gradient.png";
import SocialLink from "../commonComponent/SocialLink";

function DeveloperInfo({ name, linkedin, github, picture }) {
  return (
    <Grid
      item
      xs={4}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Avatar alt={name} src={picture} />
      <Typography>{name}</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row"
        }}
      >
        <SocialLink link={linkedin} picture={Linkedin} />
        <SocialLink link={github} picture={Github} />
      </div>
    </Grid>
  );
}

export default DeveloperInfo;
