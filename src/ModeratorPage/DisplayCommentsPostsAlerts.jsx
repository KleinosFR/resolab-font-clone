import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  CardMedia,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Divider
} from "@material-ui/core";
import { PermIdentity } from "@material-ui/icons";

import axios from "axios";

import CommentPostsAlerts from "./CommentPostsAlerts";

const apiUrl = process.env.REACT_APP_MEDIA_URL;

function DisplayCommentsPostsAlerts({ openAlert, comment, classes, token }) {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let datapost;
    axios
      .get(`${apiUrl}/api/comments/${comment.id}`, config)
      .then(res => {
        datapost = res.data.post;
      })
      .then(() => {
        axios
          .get(`${apiUrl}${datapost}`, config)
          .then(res => {
            setPost(res.data);
            setComments(res.data.comments);
          })
          .catch(err => {
            console.log(err.message);
            throw err;
          });
      })
      .catch(err => {
        console.log(err.message);
        throw err;
      });
  }, []);

  return (
    <>
      <Typography>
        {openAlert.user.username} a lancé une alerte sur le commentaire de{" "}
        {openAlert.comment.user.username} :
      </Typography>
      <Typography>"{openAlert.comment.content}"</Typography>
      <Typography>{openAlert.comment.createdAt}</Typography>
      <Divider className={classes.dividerAlert} />
      <Typography>Contexte dans lequel ce commentaire a été émis :</Typography>
      <Card style={{ width: "100%" }}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <PermIdentity />
            </Avatar>
          }
          title={
            <Typography className={classes.username}>
              {openAlert.comment.user.username}
            </Typography>
          }
        />
        <CardMedia className={classes.media} image={post.photo} />
        <CardContent>
          <Typography>{post.description}</Typography>
        </CardContent>
        <Typography style={{ fontWeight: 1000, textAlign: "left" }}>
          Commentaires :
        </Typography>
        <List className={classes.root}>
          {comments
            .slice(0)
            .reverse()
            .map(comment => (
              <CommentPostsAlerts comment={comment} classes={classes} />
            ))}
        </List>
      </Card>
      <Divider className={classes.dividerAlert} />
    </>
  );
}

export default DisplayCommentsPostsAlerts;
