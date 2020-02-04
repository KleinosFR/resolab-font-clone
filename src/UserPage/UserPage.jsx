import React, { useState } from "react";
import { Grid, Box } from "@material-ui/core";

import Layout from "../Layout/Layout";
import PostArticle from "../commonComponent/Publications/PostArticle";
import DisplayPublications from "../commonComponent/Publications/DisplayPublications";
import DisplayStories from "../commonComponent/Stories/DisplayStories";
import { useStyles } from "../commonComponent/useStyles";
import Sidebar from "../commonComponent/Sidebar";

import CustomizedSnackbars from "../commonComponent/SnackBar";

export default function UserPage() {
  const classes = useStyles();
  const [snackBarNotification, setSnackBarNotification] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackBarColor, setSnackBarColor] = useState("success");

  const handleSnackBar = (message, color) => {
    setSnackBarNotification(true);
    setSnackbarMessage(message);
    color ? setSnackBarColor(color) : setSnackBarColor("succes");
  };

  return (
    <Layout>
      <Grid container style={{ marginTop: "80px", width: "100%" }}>
        <Grid container item xs={2} justify="center">
          <PostArticle handleSnackBar={handleSnackBar} classes={classes} />
        </Grid>
        <Grid container item xs={6} xl={6} md={6} justify="center">
          <Box p={5} width="100%">
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                height: "150px",
                overflowX: "auto",
                overflowY: "visible"
              }}
            >
              <DisplayStories
                noWrap
                classes={classes}
                handleSnackBar={handleSnackBar}
              />
            </Box>
          </Box>
          <DisplayPublications handleSnackBar={handleSnackBar} />
        </Grid>
        <Grid container item xs={4} justify="center" style={{ width: "100%" }}>
          <Sidebar classes={classes} style={{ width: "100%" }} />
        </Grid>
      </Grid>

      <CustomizedSnackbars
        open={snackBarNotification}
        setOpen={setSnackBarNotification}
        handleSnackBar={handleSnackBar}
        message={snackbarMessage}
        color={snackBarColor}
      />
    </Layout>
  );
}
