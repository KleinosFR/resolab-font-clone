import React, { useState } from "react";
import { connect } from "react-redux";

import {
  ListItem,
  ListItemText,
  Divider,
  Typography,
  CardActions,
  IconButton
} from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import axios from "axios";

import CommentLikes from "./LikeAComment";

const apiUrl = process.env.REACT_APP_API_URL;

function Comment({ comment, classes, token, userId }) {
  const [isAlert, setIsAlert] = useState(false);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  const handleClickAlert = () => {
    axios
      .post(
        `${apiUrl}/alerts`,
        {
          user: `api/users/${userId}`,
          comment: `api/comments/${comment.id}`
        },
        config
      )
      .then(res => {
        setIsAlert(true);
        axios
          .put(
            `api/comments/${comment.id}`,
            {
              display: false
            },
            config
          )
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err.message);
        throw err;
      });
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={
            <Typography className={classes.username}>
              {comment.user.username}
            </Typography>
          }
          secondary={
            <>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {comment.content}
              </Typography>
            </>
          }
        />

        <CardActions disableSpacing>
          <IconButton aria-label="settings">
            {isAlert ? (
              <Warning color="secondary" onClick={handleClickAlert} />
            ) : (
              <Warning color="disabled" onClick={handleClickAlert} />
            )}
          </IconButton>
          <CommentLikes commentId={comment.id} />
        </CardActions>
      </ListItem>
      <Divider component="li" />
    </>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id,
    token: state.authReducer.token
  };
};

export default connect(mapStateToProps)(Comment);
