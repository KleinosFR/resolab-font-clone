import React from "react";
import { Typography } from "@material-ui/core";

function AlertInfo({ alert }) {
  if (alert.post) {
    return <>sur la publication de {alert.post.user.username}</>;
  }
  if (alert.comment) {
    return <>sur le commentaire de {alert.comment.user.username}</>;
  }
  if (alert.story) {
    return <>sur la story de {alert.story.user.username}</>;
  }
  if (alert.users[1]) {
    const sender = alert.users[0];
    const receiver = alert.users[1];
    return (
      <>
        sur la discussion entre {sender.username} et {receiver.username}
      </>
    );
  }
}

export default AlertInfo;
