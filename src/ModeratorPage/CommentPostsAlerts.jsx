import React from "react";
import { ListItem, ListItemText, Divider, Typography } from "@material-ui/core";

function CommentPostsAlerts({ comment, classes }) {
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
      </ListItem>
      <Divider component="li" />
    </>
  );
}

export default CommentPostsAlerts;
