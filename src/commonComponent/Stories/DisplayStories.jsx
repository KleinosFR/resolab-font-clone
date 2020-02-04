import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

import { useRecursiveGet } from "../../hooks/useApi";
import Storie from "./Story";
import PostStorie from "./PostStorie";
import img from "../../Assets/logo-resolab.png";

const mediaUrl = process.env.REACT_APP_MEDIA_URL;

function DisplayStories({
  classes,
  handleSnackBar,
  roles,
  classroomId,
  isRestricted
}) {
  const { datas, request } = useRecursiveGet("/stories", 10000);
  const [userRoles, setUserRoles] = useState(roles);

  useEffect(() => {
    request();
  }, []);

  return (
    <Grid container direction="row" alignItems="center" wrap="nowrap">
      <PostStorie classes={classes} handleSnackBar={handleSnackBar} />
      {datas && (
        <>
          {userRoles[0] === "ROLE_STUDENT" && isRestricted
            ? datas
                .filter(story =>
                  story.user.classRoom
                    ? story.user.classRoom.id === classroomId
                    : true
                )
                .map(story => {
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
                              handleSnackBar={handleSnackBar}
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
                })
            : datas.map(story => {
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
        </>
      )}
    </Grid>
  );
}

const mapStateToProps = state => {
  return {
    roles: state.userReducer.roles,
    classroomId: state.userReducer.classroom
      ? state.userReducer.classroom.id
      : null,
    isRestricted: state.userReducer.isRestricted
  };
};

export default connect(mapStateToProps)(DisplayStories);
