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
  if (alert.users[1]) {
    const sender = alert.users[0];
    const receiver = alert.users[1];
    return (
      <div>
        sur la discussion entre {sender.username} et {receiver.username}
      </div>
    );
  }
}

export default AlertInfo;
