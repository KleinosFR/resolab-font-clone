import React from "react";
import { Typography, CardMedia } from "@material-ui/core";
import { connect } from "react-redux";

import DisplayCommentsPostsAlerts from "./DisplayCommentsPostsAlerts";

function ModerationContent({ classes, openAlert, token }) {
  if (openAlert.post) {
    return (
      <>
        <Typography>
          {openAlert.user.username} a lancé une alerte sur la publication de{" "}
          {openAlert.post.user.username} :
        </Typography>

        {openAlert.post.photo && (
          <CardMedia className={classes.media} image={openAlert.post.photo} />
        )}
        <Typography>"{openAlert.post.description}"</Typography>
        <Typography>{openAlert.post.createdAt}</Typography>
      </>
    );
  }
  if (openAlert.comment) {
    return (
      <DisplayCommentsPostsAlerts
        openAlert={openAlert}
        comment={openAlert.comment}
        classes={classes}
        token={token}
      />
    );
  }
  if (openAlert.story) {
    return (
      <>
        <Typography>
          {openAlert.user.username} a lancé une alerte sur la story de
          {openAlert.story.user.username} :
        </Typography>

        {openAlert.story.image && (
          <CardMedia
            className={classes.media}
            image={`http://localhost:8089/media/${openAlert.story.image.filePath}`}
          />
        )}
        <div className="separation-post-comment">
          <Typography>{openAlert.story.date}</Typography>
        </div>
      </>
    );
  }
  if (openAlert.chat) {
    return (
      <Typography>
        {openAlert.user.username} a lancé une alerte sur la discussion de{" "}
        {openAlert.chat.user.username} :
      </Typography>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id,
    token: state.authReducer.token
  };
};

export default connect(mapStateToProps)(ModerationContent);
