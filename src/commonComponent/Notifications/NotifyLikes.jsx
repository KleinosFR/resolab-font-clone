import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import LikeNotification from "./LikeNotification";

function NotifyLikes({ userId, setCount, token }) {
  const [userLikes, setUserLikes] = useState([]);
  const [likesForUser, setLikesForUser] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchLikes = page => {
    // retreiving all posts from database until there is no more post
    const nextPage = page + 1;
    let newUserLikes = [];
    axios
      .get(`${apiUrl}/likes?page=${page}`, config)
      .then(res => {
        const fetchedLikes = res.data;

        const fetchedUserLikes = fetchedLikes.filter(
          like =>
            (like.post && like.post.user.id === userId) ||
            (like.comment && like.comment.user.id === userId)
        );
        newUserLikes = userLikes.concat(fetchedUserLikes);
        setUserLikes(newUserLikes);
      })
      .then(
        axios.get(`${apiUrl}/likes?page=${nextPage}`, config).then(res => {
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

  useEffect(() => {
    setLikesForUser(userLikes.reverse().splice(0, 5));
  }, [userLikes]);

  useEffect(() => setCount(likesForUser.length), [likesForUser]);

  return (
    <div>
      {likesForUser.map(like => (
        <LikeNotification like={like} />
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id,
    token: state.authReducer.token
  };
};

export default connect(mapStateToProps)(NotifyLikes);
