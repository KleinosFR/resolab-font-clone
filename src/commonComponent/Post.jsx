import React, { useState, useEffect } from "react";
import { Warning, PermIdentity, ChatBubbleOutline } from "@material-ui/icons";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography
} from "@material-ui/core";
import axios from "axios";
import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { connect } from "react-redux";

import apiCallAuth from "../apiCallAuth";
import CommentInput from "./CommentInput";
import DisplayComments from "./DisplayComments";

const apiUrl = process.env.REACT_APP_API_URL;

function Post({
  description,
  photo,
  classes,
  handleSnackBar,
  postId,
  userId,
  comments,
  likes,
  owner,
  token
}) {
  const [displayCommentsPost, setDisplayComments] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [alert, setAlert] = useState(false);
  const [stateLikes, setStateLikes] = useState(likes);
  const [likesCount, setLikesCount] = useState(stateLikes.length);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    stateLikes.some(like => like.user.id === userId) && setIsLiked(true);
  }, []);

  useEffect(() => {
    setLikesCount(stateLikes.length);
  }, [stateLikes]);

  const handlePostComment = () => {
    if (inputValue === "") {
      setIsInputEmpty(true);
    } else {
      apiCallAuth
        .post("/comments", {
          content: inputValue,
          date: new Date().toISOString(),
          post: `/api/posts/${postId}`,
          user: `/api/users/${userId}`
        })
        .then(res => {
          setInputValue("");
          return handleSnackBar("Ton commentaire a bien été posté");
        })
        .catch(err => console.log(err));
    }
  };

  const handleDisplayComments = () => {
    setDisplayComments(!displayCommentsPost);
  };
  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleLike = () => {
    setIsButtonDisabled(true);
    // Si c'est déjà liké, on supprime le like dans l'API, puis isLiked -> false, count -1
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    if (isLiked) {
      const foundLike = stateLikes.find(like => userId === like.user.id);
      if (foundLike) {
        axios
          .delete(`${apiUrl}/likes/${foundLike.id}`, config)
          .then(() => axios.get(`${apiUrl}/posts/${postId}`, config))
          .then(res => {
            setStateLikes(res.data.likes);
            setIsLiked(false);
          })
          .finally(() => {
            setIsButtonDisabled(false);
          })
          .catch(err => {
            console.log(err.message);
            throw err;
          });
      } else {
        alert("Undefined !");
      }
    }

    // Si c'est pas liké, on crée le like dans l'API, puis isLiked -> true, count +1
    if (!isLiked) {
      axios
        .post(
          `${apiUrl}/likes`,
          {
            user: `api/users/${userId}`,
            post: `api/posts/${postId}`
          },
          config
        )
        .then(() => axios.get(`${apiUrl}/posts/${postId}`, config))
        .then(res => {
          setStateLikes(res.data.likes);
          setIsLiked(true);
        })
        .finally(() => {
          setIsButtonDisabled(false);
        })
        .catch(err => {
          console.log(err.message);
          throw err;
        });
    }
  };

  const handleClickAlert = () => {
    setAlert(!alert);
  };
  return (
    <Card className={classes.card} style={{ width: "50vw" }}>
      <div className="scroll-post">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <PermIdentity />
            </Avatar>
          }
          title={
            <Typography className={classes.username}>
              {owner.username}
            </Typography>
          }
          action={
            <IconButton aria-label="settings">
              {alert ? (
                <Warning color="secondary" onClick={handleClickAlert} />
              ) : (
                <Warning color="disabled" onClick={handleClickAlert} />
              )}
            </IconButton>
          }
        />
        <CardMedia className={classes.media} image={photo} />
        <CardContent>
          <Typography>{description}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="j'aime cette publication"
            disabled={isButtonDisabled}
          >
            {isLiked ? (
              <Favorite color="secondary" onClick={handleLike} />
            ) : (
              <FavoriteBorder color="disabled" onClick={handleLike} />
            )}
          </IconButton>
          {likesCount}
          <IconButton aria-label="add to favorites">
            <ChatBubbleOutline onClick={handleDisplayComments} />
          </IconButton>
          {comments.length}
        </CardActions>
        {displayCommentsPost && (
          <>
            <DisplayComments comments={comments} classes={classes} />
          </>
        )}
        <CommentInput
          isError={isInputEmpty}
          helperText={isInputEmpty ? "Entre un commentaire" : null}
          value={inputValue}
          onChange={handleInputChange}
          inputComment={handlePostComment}
          id={postId}
        />
      </div>
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id,
    token: state.authReducer.token
  };
};

export default connect(mapStateToProps)(Post);