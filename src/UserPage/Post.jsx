import React, { useState, useEffect } from "react";
import {
  Warning,
  PermIdentity,
  ChatBubbleOutline
  //  FavoriteBorder
} from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography
} from "@material-ui/core";

import { FavoriteBorder, Favorite } from "@material-ui/icons";
import { connect } from "react-redux";

import apiCallAuth from "../apiCallAuth";
import CommentInput from "./CommentInput";
import Axios from "axios";

function Post({
  description,
  photo,
  classes,
  handleSnackBar,
  postId,
  userId,
  comments,
  owner
}) {
  const [inputCommentPost, setInputComment] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const [isLiked, setIsLiked] = useState(false);

  const [alert, setAlert] = useState(false);
  const [count, setCount] = useState(0);
  const [timeOut, setTimeOut] = useState();

  const [postOwnerInfo, setPostOwnerInfo] = useState({});

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
          handleInputComment();
          return handleSnackBar();
        })
        .catch(err => console.log(err));
    }
  };

  const handleInputComment = () => {
    setInputComment(!inputCommentPost);
  };
  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    setIsLiked(!isLiked);
  };
  const handleClickAlert = () => {
    setAlert(!alert);
  };

  // useEffect(() => {
  //     Axios.get(`http://localhost:8089${ownerId}`, {
  //         headers: {
  //             Authorization: "Bearer " + sessionStorage.getItem("token"),
  //             Accept: "application/json"
  //         }
  //     })
  //         .then(res => {
  //             setPostOwnerInfo(res.data);
  //         })
  //         .catch(err => console.log(err));
  // }, [ownerId]);
  return (
    <Card className={classes.card}>
      <div className="scroll-post">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <PermIdentity />
            </Avatar>
          }
          title={owner.username}
          action={
            <IconButton aria-label="settings">
              <Warning />
            </IconButton>
          }
        />
        <CardMedia className={classes.media} image={photo} />
        <CardContent>
          <Typography>{description}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            {isLiked ? (
              <Favorite color="secondary" onClick={handleClick} />
            ) : (
              <FavoriteBorder color="disabled" onClick={handleClick} />
            )}
          </IconButton>
          <IconButton aria-label="add to favorites">
            <ChatBubbleOutline onClick={handleInputComment} />
          </IconButton>
        </CardActions>
        <CardContent>
          {/* -------- TODO : insert mapping of the comments from props comment -------------- */}
        </CardContent>
        <Collapse Timeout="auto" unmountOnExit>
          <CardContent></CardContent>
        </Collapse>
        {inputCommentPost ? (
          <CommentInput
            isError={isInputEmpty}
            helperText={isInputEmpty ? "Entre un commentaire" : null}
            value={inputValue}
            onChange={handleInputChange}
            inputComment={handlePostComment}
            id={postId}
          />
        ) : (
          false
        )}
      </div>
    </Card>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id
  };
};

export default connect(mapStateToProps)(Post);
