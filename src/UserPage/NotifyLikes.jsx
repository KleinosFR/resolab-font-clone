import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { List } from "@material-ui/core";

import apiCallAuth from "../apiCallAuth";
import LikeNotification from "./LikeNotification";

function NotifyLikes({ userId }) {
  const [userLikes, setUserLikes] = useState([]);
  const [likesForUser, setLikesForUser] = useState([]);

  const fetchLikes = page => {
    // retreiving all posts from database until there is no more post
    const nextPage = page + 1;
    apiCallAuth
      .get(`/likes?page=${page}`)
      .then(res => {
        const fetchedLikes = res.data;
        console.log(page);
        console.log(fetchedLikes);

        const fetchedUserLikes = fetchedLikes.filter(
          like =>
            (like.post && like.post.user.id === userId) ||
            (like.comment && like.comment.user.id === userId)
        );
        const newUserLikes = userLikes.concat(fetchedUserLikes);
        console.log(newUserLikes);
        setUserLikes(newUserLikes);
      })
      .then(
        apiCallAuth.get(`/likes?page=${nextPage}`).then(res => {
          if (res.data.length !== 0) {
            fetchLikes(nextPage);
          }
        })
      )

      .catch(err => console.log("error", err));
  };

  useEffect(() => {
    fetchLikes(1);
  }, []);

  return (
    <div>
      {userLikes.map(like => (
        <LikeNotification like={like} />
      ))}
    </div>
  );
}
const mapStateToProps = state => {
  return { userId: state.userReducer.id };
};

export default connect(mapStateToProps)(NotifyLikes);