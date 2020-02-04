import React, { useState, useEffect } from "react";
import { filter } from "lodash";
import {
  Warning,
  PermIdentity,
  ChatBubbleOutline,
  Filter
} from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";

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

import CommentInput from "./Comments/CommentInput";
import DisplayComments from "./Comments/DisplayComments";

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
  token,
  userIdPublication
}) {
  const [displayCommentsPost, setDisplayComments] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [stateLikes, setStateLikes] = useState(likes);
  const [likesCount, setLikesCount] = useState(stateLikes.length);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isMyPublication, setIsMyPublication] = useState(false);
  const [commentsCount, setCommentsCounts] = useState(comments.length);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  useEffect(() => {
    stateLikes.some(like => like.user.id === userId) && setIsLiked(true);
    if (userId === userIdPublication) {
      setIsMyPublication(true);
    }
  }, []);

  useEffect(() => {
    const displayComments = comments && filter(comments, "display");
    comments && setCommentsCounts(displayComments);
  }, [comments]);

  useEffect(() => {
    setLikesCount(stateLikes.length);
  }, [stateLikes]);

  const handlePostComment = () => {
    if (inputValue === "") {
      setIsInputEmpty(true);
    } else {
      axios
        .post(
          `${apiUrl}/comments`,
          {
            content: inputValue,
            date: new Date().toISOString(),
            post: `/api/posts/${postId}`,
            user: `/api/users/${userId}`
          },
          config
        )
        .then(res => {
          setInputValue("");
          return handleSnackBar("Ton commentaire a bien été posté", "success");
        })
        .catch(err => handleSnackBar("Il y a eu un problème", "error"));
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
        isAlert("Undefined !");
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

  const handleClickAlert = async () => {
    try {
      const postAlert = axios.post(
        `${apiUrl}/alerts`,
        { user: `api/users/${userId}`, post: `api/posts/${postId}` },
        config
      );
      await Promise.all([postAlert]);

      setIsAlert(true);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };

  const stopDisplayMyPublication = () => {
    axios
      .put(
        `${apiUrl}/posts/${postId}`,
        {
          display: false
        },
        config
      )
      .then(res => {
        handleSnackBar("Ta publication a bien été supprimée", "success");
      })
      .catch(err => {
        handleSnackBar("Il y a eu un problème", "error");
        throw err;
      });
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
            <>
              {isMyPublication && (
                <IconButton
                  aria-label="settings"
                  onClick={stopDisplayMyPublication}
                >
                  <DeleteIcon />
                </IconButton>
              )}
              <IconButton aria-label="settings" onClick={handleClickAlert}>
                {isAlert ? (
                  <Warning color="secondary" />
                ) : (
                  <Warning color="disabled" />
                )}
              </IconButton>
            </>
          }
        />
        <CardMedia
          className={classes.media}
          image={photo}
          // style={{ maxHeight: "50vh" }}
        />
        <CardContent>
          <Typography>{description}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="j'aime cette publication"
            disabled={isButtonDisabled}
            onClick={handleLike}
          >
            {isLiked ? (
              <Favorite color="secondary" />
            ) : (
              <FavoriteBorder color="disabled" />
            )}
          </IconButton>
          {likesCount}
          <IconButton
            aria-label="add to favorites"
            onClick={handleDisplayComments}
          >
            <ChatBubbleOutline />
          </IconButton>
          {commentsCount.length}
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
