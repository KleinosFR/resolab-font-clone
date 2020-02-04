import React from "react";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { ChatBubbleOutline } from "@material-ui/icons";

function CommentNotification({ comment }) {
  const displayMessage =
    comment.message.length < 30
      ? comment.message
      : `${comment.message.slice(0, 30)}...`;

  return (
    <ListItem
      key={comment.id}
      style={{ paddingTop: "0px", paddingBottom: "0px" }}
      button
    >
      <ListItemAvatar>
        <ChatBubbleOutline />
      </ListItemAvatar>
      <ListItemText
        primary={`${comment.user.username} a commenté ta publication`}
        secondary={displayMessage}
      />
    </ListItem>
  );
}

export default CommentNotification;
