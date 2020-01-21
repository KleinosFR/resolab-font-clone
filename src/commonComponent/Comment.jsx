import React, { useState } from "react";

import {
  ListItem,
  ListItemText,
  Divider,
  Typography,
  CardActions,
  IconButton
} from "@material-ui/core";

import CommentLikes from "./CommentLikes";

function Comment({ comment, classes }) {
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
          <CommentLikes commentId={comment.id} />
        </CardActions>
      </ListItem>
      <Divider component="li" />
    </>
  );
}

export default Comment;