import React from "react";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import { FavoriteBorder } from "@material-ui/icons";

function LikeNotification({ like }) {
  const displayLike = like.comment
    ? {
        id: like.id,
        user: like.user,
        content: like.comment.content,
        liker: like.comment.user,
        type: "ton commentaire"
      }
    : {
        id: like.id,
        user: like.user,
        liker: like.post.user,
        content: like.post.description,
        type: "ta publication"
      };

  const displayMessage =
    displayLike.length < 30
      ? displayLike.content
      : `${displayLike.content.slice(0, 30)}...`;

  return (
    <ListItem
      key={like.id}
      style={{ paddingTop: "0px", paddingBottom: "0px" }}
      button
    >
      <ListItemAvatar>
        <FavoriteBorder />
      </ListItemAvatar>
      <ListItemText
        primary={`${like.user.username} a aimé ${displayLike.type}`}
        secondary={displayMessage}
      />
    </ListItem>
  );
}

export default LikeNotification;
