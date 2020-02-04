import React from "react";

function AlertInfo({ alert }) {
  if (alert.post) {
    return <div>sur la publication de {alert.post.user.username}</div>;
  }
  if (alert.comment) {
    return <div>sur le commentaire de {alert.comment.user.username}</div>;
  }
  if (alert.story) {
    return <div>sur la story de {alert.story.user.username}</div>;
  }
  if (alert.chat) {
    return <div>sur la discussion de {alert.chat.user.username}</div>;
  }
}

export default AlertInfo;
