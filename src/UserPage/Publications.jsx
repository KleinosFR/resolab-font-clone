import React, { useState, useEffect } from "react";
import { Box } from "@material-ui/core";
import { useGet, Poll } from "restful-react";

import { useStyles } from "./useStyles";
import apiCallAuth from "../apiCallAuth";
import Post from "./Post";

function Publications({ handleSnackBar }) {
  const [publications, setPublications] = useState([]);
  const [restfulPubli, setRestfulPubli] = useState([]);

  const classes = useStyles();

  // useEffect(() => {
  //     const fetchDatas = async () => {
  //         console.log(restfulPubli);

  //         const res = await apiCallAuth.get("/posts");
  //         setPublications(res.data);
  //         setTimeout(() => {
  //             fetchDatas();
  //         }, 10000);
  //     };
  //     fetchDatas();
  // }, []);

  return (
    <Poll path="/posts" resolve={data => data && setPublications(data)}>
      {(data, {}) => {
        return <div>toto</div>;
      }}

      {/* publications.map(publication => (
                 <Box m={2}>
                     <Post
                         key={publication.id}
                         description={publication.description}
                         photo={publication.photo}
                         classes={classes}
                         handleSnackBar={handleSnackBar}
                         postId={publication.id}
                         comments={publication.comments}
                         owner={publication.user}
                     />
                 </Box>
             ))} */}
    </Poll>
  );
}

export default Publications;
