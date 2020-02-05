import React, { useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Avatar,
  Typography,
  Switch,
  IconButton,
  Paper,
  Button,
  CircularProgress,
  Box
} from "@material-ui/core";
import PermIdentity from "@material-ui/icons/PermIdentity";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";

import ModerationContent from "./ModerationContent";
import { removeAlert, setAlert } from "../reducers/actions";

const apiUrl = process.env.REACT_APP_API_URL;

function ModerationComponent({
  openAlert,
  classes,
  removeAlert,
  setAlert,
  token,
  userId
}) {
  const [isBlocked, setIsBlocked] = useState(true);
  const [isBlockedLoading, setIsBlockedLoading] = useState(false);
  const [isTakenInCharge, setIsTakenInCharge] = useState(openAlert.takenCare);
  const [isResolved, setIsResolved] = useState(false);
  const [isResolvedLoading, setIsResolvedLoading] = useState(false);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  const handleBlocked = () => {
    setIsBlockedLoading(true);
    if (openAlert.post) {
      axios
        .put(
          `${apiUrl}/posts/${openAlert.post.id}`,
          {
            display: true
          },
          config
        )
        .then(res => {
          setIsBlocked(!isBlocked);
          console.log(res);
          axios
            .get(`${apiUrl}/alerts/${openAlert.id}`, config)
            .then(res => {
              const updatedAlert = res.data;
              console.log(updatedAlert);
              setAlert(updatedAlert);
            })
            .catch(err => {
              console.log(err.message);
              throw err;
            });
        })
        .catch(err => console.log(err))
        .finally(() => setIsBlockedLoading(false));
    }
    if (openAlert.story) {
      axios
        .put(
          `${apiUrl}/stories/${openAlert.story.id}`,
          {
            display: true
          },
          config
        )
        .then(res => {
          setIsBlocked(!isBlocked);
          console.log(res);
          axios
            .get(`${apiUrl}/alerts/${openAlert.id}`, config)
            .then(res => {
              const updatedAlert = res.data;
              console.log(updatedAlert);
              setAlert(updatedAlert);
            })
            .catch(err => {
              console.log(err.message);
              throw err;
            });
        })
        .catch(err => console.log(err))
        .finally(() => setIsBlockedLoading(false));
    }
    if (openAlert.comment) {
      axios
        .put(
          `${apiUrl}/comments/${openAlert.comment.id}`,
          {
            display: true
          },
          config
        )
        .then(res => {
          setIsBlocked(!isBlocked);
          console.log(res);
          axios
            .get(`${apiUrl}/alerts/${openAlert.id}`, config)
            .then(res => {
              const updatedAlert = res.data;
              console.log(updatedAlert);
              setAlert(updatedAlert);
            })
            .catch(err => {
              console.log(err.message);
              throw err;
            });
        })
        .catch(err => console.log(err))
        .finally(() => setIsBlockedLoading(false));
    }
  };

  const handleTakeInCharge = () => {
    axios
      .put(
        `${apiUrl}/alerts/${openAlert.id}`,
        {
          takenCare: true,
          moderator: `/api/users/${userId}`
        },
        config
      )
      .then(res => {
        const updatedAlert = res.data;
        setAlert(updatedAlert);
      })
      .catch(err => console.log(err));
    setIsTakenInCharge(true);
  };

  const handleResolved = () => {
    setIsResolved(!isResolved);
    setIsResolvedLoading(true);
    axios
      .put(
        `${apiUrl}/alerts/${openAlert.id}`,
        {
          resolved: true
        },
        config
      )
      .then(res => {
        console.log(res);
        removeAlert();
      })
      .catch(err => console.log(err))
      .finally(() => setIsResolvedLoading(false));
  };

  return (
    <Card
      className={classes.card}
      style={{ width: "45vw", textAlign: "center" }}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <PermIdentity />
          </Avatar>
        }
        title={
          <Typography className={classes.username}>
            Alerte de {openAlert.user.username}
          </Typography>
        }
        action={
          <IconButton aria-label="settings" onClick={() => removeAlert()}>
            <RemoveOutlinedIcon />
          </IconButton>
        }
      />
      <CardContent>
        <ModerationContent openAlert={openAlert} classes={classes} />
        <Grid
          container
          item
          xs={12}
          display="flex"
          direction="row"
          style={{ margin: "auto", padding: "5px" }}
        >
          <Paper elevation={1} style={{ textAlign: "center", width: "100%" }}>
            <Box p={2}>
              <Typography>
                Message laissé par {openAlert.user.username} concernant cette
                alerte :
              </Typography>
              <Typography>"Cette publication me pose problème."</Typography>
            </Box>
          </Paper>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Grid container>
          {openAlert.takenCare === false ? (
            <>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Typography
                  style={{
                    color: "#ff5722",
                    fontWeight: "1000"
                  }}
                >
                  Prise en charge du problème
                </Typography>
                <Switch
                  checked={isTakenInCharge}
                  onChange={handleTakeInCharge}
                  value={isTakenInCharge}
                  color="secondary"
                />
              </Grid>
              <Grid item xs={4}></Grid>
            </>
          ) : userId === openAlert.moderator.id ? (
            <>
              <Grid item xs={4}>
                {(openAlert.post && openAlert.post.display === false) ||
                (openAlert.comment && openAlert.comment.display === false) ||
                (openAlert.story && openAlert.story.display === false) ? (
                  <Button
                    variant="contained"
                    startIcon={isBlockedLoading && <CircularProgress />}
                    disabled={isBlockedLoading}
                    color={"secondary"}
                    onClick={handleBlocked}
                  >
                    Débloquer le contenu
                  </Button>
                ) : (
                  <Button variant="contained" disabled>
                    Débloquer le contenu
                  </Button>
                )}
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Button
                  variant="contained"
                  startIcon={isResolvedLoading && <CircularProgress />}
                  disabled={isResolvedLoading}
                  color={isResolved ? "primary" : "secondary"}
                  onClick={handleResolved}
                >
                  Problème résolu
                </Button>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Typography
                  style={{
                    color: "#ff5722",
                    fontWeight: "1000"
                  }}
                >
                  {openAlert.moderator.username} a pris en charge cette alerte
                </Typography>
              </Grid>
              <Grid item xs={4}></Grid>
            </>
          )}
        </Grid>
      </CardActions>
    </Card>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    removeAlert: () => dispatch(removeAlert()),
    setAlert: alert => dispatch(setAlert(alert))
  };
};

const mapStateToProps = state => ({
  openAlert: state.alertReducer.alert,
  token: state.authReducer.token,
  userId: state.userReducer.id
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModerationComponent);
