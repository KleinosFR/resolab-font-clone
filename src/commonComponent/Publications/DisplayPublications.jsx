import React, { useState, useEffect } from "react";
import { Box, Switch, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import BottomScrollListener from "react-bottom-scroll-listener";
import { useStyles } from "../useStyles";
import Publication from "./Publication";
import axios from "axios";

import useInterval from "../../useInterval";

const apiUrl = process.env.REACT_APP_API_URL;

function DisplayPublications({ handleSnackBar, userId, token }) {
  const [publications, setPublications] = useState([]);
  const [showUserPublications, setShowUserPublications] = useState(false);
  const [lastPageToFetch, setLastPageToFetch] = useState(1);
  const [timerCount, setTimerCount] = useState(0);

  const classes = useStyles();

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  //  sets the interval for fetching new posts using custom hook
  useInterval(() => {
    setTimerCount(timerCount + 1);
  }, 10000);

  useEffect(() => {
    const fetchDatas = async page => {
      const res = await fetchPages(page);
      setPublications(res);
    };
    fetchDatas(lastPageToFetch);
  }, [lastPageToFetch, timerCount]);

  const fetchPages = async lastPage => {
    let fetchedPublications = [];
    for (let page = 1; page <= lastPage; page++) {
      const res = await axios.get(
        `${apiUrl}/posts?display=true&page=${page}`,
        config
      );
      fetchedPublications = fetchedPublications.concat(res.data);
    }
    return fetchedPublications;
  };

  const fetchMorePages = () => {
    setLastPageToFetch(lastPageToFetch + 1);
  };

  return (
    <BottomScrollListener onBottom={fetchMorePages}>
      <Grid direction="column" onContextMenu={e => e.preventDefault()}>
        <Grid container spacing={0} align="center" justify="center">
          <Grid item xs="5">
            <Typography>Toutes les publications</Typography>
          </Grid>
          <Grid item xs="2">
            <Switch
              checked={showUserPublications}
              onChange={() => setShowUserPublications(!showUserPublications)}
              value={showUserPublications}
              color="primary"
            />
          </Grid>
          <Grid item xs="5">
            <Typography>Mes publications</Typography>
          </Grid>
        </Grid>
        <Grid>
          {showUserPublications
            ? publications
                .filter(publi => publi.user.id === userId)
                .map(publication => {
                  return (
                    <>
                      {publication.display && (
                        <Box m={2}>
                          <Publication
                            key={publication.id}
                            description={publication.description}
                            photo={publication.photo}
                            classes={classes}
                            handleSnackBar={handleSnackBar}
                            postId={publication.id}
                            comments={publication.comments}
                            owner={publication.user}
                            likes={publication.likes}
                            userIdPublication={publication.user.id}
                          />
                        </Box>
                      )}
                    </>
                  );
                })
            : publications.map(publication => {
                return (
                  <>
                    {publication.display && (
                      <Box m={2}>
                        <Publication
                          key={publication.id}
                          description={publication.description}
                          photo={publication.photo}
                          classes={classes}
                          handleSnackBar={handleSnackBar}
                          postId={publication.id}
                          comments={publication.comments}
                          owner={publication.user}
                          likes={publication.likes}
                          userIdPublication={publication.user.id}
                        />
                      </Box>
                    )}
                  </>
                );
              })}
        </Grid>
      </Grid>
    </BottomScrollListener>
  );
}

const mapStateToProps = state => {
  return {
    userId: state.userReducer.id,
    token: state.authReducer.token
  };
};

export default connect(mapStateToProps)(DisplayPublications);
