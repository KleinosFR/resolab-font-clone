import React, { useState, useEffect } from "react";

import { PermIdentity, Warning } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardHeader,
  Avatar,
  Typography,
  Grid,
  Box,
  Modal,
  Backdrop,
  Fade,
  IconButton
} from "@material-ui/core";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function Storie({
  classes,
  storyId,
  username,
  image,
  token,
  userId,
  userIdStory,
  handleSnackBar
}) {
  const [open, setOpen] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [isMyStory, setIsMyStory] = useState(false);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  useEffect(
    () => {
      if (userId === userIdStory) {
        setIsMyStory(true);
      }
    },
    // eslint-disable-next-line
    []
  );

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickAlert = () => {
    axios
      .post(
        `${apiUrl}/alerts`,
        {
          user: `api/users/${userId}`,
          story: `api/stories/${storyId}`
        },
        config
      )
      .then(res => {
        setIsAlert(true);
      })
      .catch(err => {
        console.log(err.message);
        throw err;
      });
  };

  const stopDisplayMyStory = () => {
    axios
      .put(
        `${apiUrl}/stories/${storyId}`,
        {
          display: false
        },
        config
      )
      .then(res => {
        handleSnackBar("Ta story a bien été supprimée", "success");
      })
      .catch(err => {
        handleSnackBar("Il y a eu un problème", "error");
      });
  };

  return (
    <div>
      <Box mx={2}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Card className={classes.storie}>
            <CardActionArea className={classes.storie} onClick={handleOpen}>
              <CardMedia className={classes.media} image={image} />
            </CardActionArea>
          </Card>
          <Typography className={classes.username}>{username}</Typography>
        </Grid>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
        transition-modal-title
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Card className={classes.card} style={{ width: "50vw" }}>
              <div className="scroll-post">
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      <PermIdentity />
                    </Avatar>
                  }
                  title={
                    <Typography className={classes.username}>
                      {username}
                    </Typography>
                  }
                  action={
                    <>
                      {isMyStory && (
                        <IconButton
                          aria-label="settings"
                          onClick={stopDisplayMyStory}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                      <IconButton
                        aria-label="settings"
                        onClick={handleClickAlert}
                      >
                        {isAlert ? (
                          <Warning color="secondary" />
                        ) : (
                          <Warning color="disabled" />
                        )}
                      </IconButton>
                    </>
                  }
                />
                <CardMedia className={classes.media} image={image} />
              </div>
            </Card>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id,
    token: state.authReducer.token
  };
};

export default connect(mapStateToProps)(Storie);
