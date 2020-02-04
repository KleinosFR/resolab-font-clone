import React from "react";
import Comment from "./Comment";

import { List, Typography, CardContent } from "@material-ui/core";

function DisplayComments({ comments, classes }) {
  return (
    <>
      {comments.length > 0 ? (
        <List className={classes.root}>
          {comments
            .slice(0)
            .reverse()
            .map(comment => (
              <>
                {comment.display && (
                  <Comment comment={comment} classes={classes} />
                )}
              </>
            ))}
        </List>
      ) : (
        <CardContent>
          <Typography>Aucun commentaire</Typography>
        </CardContent>
      )}
    </>
  );
}

export default DisplayComments;
