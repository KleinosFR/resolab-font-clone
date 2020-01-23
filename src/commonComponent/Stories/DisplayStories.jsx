import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import { useRecursiveGet } from "../../hooks/useApi";
import Storie from "./Story";
import PostStorie from "./PostStorie";
import img from "../../Assets/logo-resolab.png";

const mediaUrl = process.env.REACT_APP_MEDIA_URL;

function DisplayStories({ classes, handleSnackBar }) {
  const { datas, request } = useRecursiveGet("/stories", 10000);

  useEffect(() => {
    request();
  }, []);

  return (
    <Grid container direction="row" alignItems="center" wrap="nowrap">
      <PostStorie classes={classes} handleSnackBar={handleSnackBar} />
      {datas &&
        datas.map(story => {
          const storyDate = Date.parse(story.date);
          const nowDate = Date.now();
          const imageStory = story.image;
          return (
            <>
              {nowDate - storyDate < 86400000 && story.display && (
                <>
                  {imageStory ? (
                    <Storie
                      storyId={story.id}
                      classes={classes}
                      username={story.user.username}
                      userIdStory={story.user.id}
                      image={`${mediaUrl}/media/${story.image.filePath}`}
                    />
                  ) : (
                    <Storie
                      storyId={story.id}
                      classes={classes}
                      username={story.user.username}
                      userIdStory={story.user.id}
                      image={img}
                    />
                  )}
                </>
              )}
            </>
          );
        })}
    </Grid>
  );
}

export default DisplayStories;
