import React, { useState, useEffect } from "react";

import { IconButton } from "@material-ui/core";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { connect } from "react-redux";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function CommentLikes({ commentId, userId, token }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  useEffect(
    () => {
      axios
        .get(`${apiUrl}/likes?comment.id=${commentId}`, config)
        .then(res => {
          const data = res.data;
          setLikes(data);
        })
        .catch(err => console.log("error fetching likes", err));
    },
    // eslint-disable-next-line
    []
  );

  useEffect(
    () => {
      likes.some(like => like.user.id === userId) && setIsLiked(true);
      setLikesCount(likes.length);
    },
    // eslint-disable-next-line
    [likes]
  );

  const handleLike = () => {
    if (isLiked) {
      const userLike = likes.find(like => like.user.id === userId);
      axios
        .delete(`${apiUrl}/likes/${userLike.id}`, config)
        .then(res => {
          axios
            .get(`${apiUrl}/likes?comment.id=${commentId}`, config)
            .then(res => {
              const data = res.data;
              setLikes(data);
              setIsLiked(false);
            })
            .finally(setIsButtonDisabled(false))
            .catch(err => console.log("error", err));
        })
        .catch(err => console.log("error", err));
    } else {
      axios
        .post(
          `${apiUrl}/likes`,
          {
            user: `api/users/${userId}`,
            comment: `api/comments/${commentId}`
          },
          config
        )
        .then(res => {
          axios
            .get(`${apiUrl}/likes?comment.id=${commentId}`, config)
            .then(res => {
              const data = res.data;
              setLikes(data);
            })
            .finally(setIsButtonDisabled(false))
            .catch(err => console.log("error", err));
        })

        .catch(err => console.log("error", err));
    }
  };
  return (
    <>
      <IconButton
        aria-label="j'aime le commentaire"
        onClick={() => {
          handleLike();
          setIsButtonDisabled(true);
        }}
        disabled={isButtonDisabled}
      >
        {isLiked ? (
          <Favorite color="secondary" />
        ) : (
          <FavoriteBorder color="disabled" />
        )}
      </IconButton>
      {likesCount}
    </>
  );
}

const mapstateToProps = state => {
  return {
    userId: state.userReducer.id,
    token: state.authReducer.token
  };
};

export default connect(mapstateToProps)(CommentLikes);
