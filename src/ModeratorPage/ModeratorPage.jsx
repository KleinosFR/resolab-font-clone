import React, { useState } from "react";
import { Grid, Box, Snackbar } from "@material-ui/core";
import { connect } from "react-redux";

import Layout from "../Layout/Layout";
import PostArticle from "../commonComponent/Publications/PostArticle";
import DisplayPublications from "../commonComponent/Publications/DisplayPublications";
import DisplayStories from "../commonComponent/Stories/DisplayStories";
import Sidebar from "../commonComponent/Sidebar";
import ModerationComponent from "./ModerationComponent";

import { useStyles } from "../commonComponent/useStyles";

import CustomizedSnackbars from "../commonComponent/SnackBar";

function ModeratorPage({ openAlert }) {
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
      <Grid container style={{ marginTop: "80px" }} spacing={3}>
        <Grid container item xs={2} justify="center">
          <PostArticle handleSnackBar={handleSnackBar} classes={classes} />
        </Grid>
        <Grid container item xs={6} xl={6} justify="center">
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
          {openAlert.resolved === false ? (
            <ModerationComponent classes={classes} />
          ) : (
            <DisplayPublications handleSnackBar={handleSnackBar} />
          )}
        </Grid>
        <Grid container item xs={3} xl={3} justify="center">
          <Sidebar classes={classes} />
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

const mapStateToProps = state => ({
  openAlert: state.alertReducer.alert
});

export default connect(mapStateToProps)(ModeratorPage);
