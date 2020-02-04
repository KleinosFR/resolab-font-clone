import React, { useState, useEffect } from "react";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Box,
  Grid,
  Badge
} from "@material-ui/core";
import { Notifications, ExpandMore } from "@material-ui/icons/";

import NotifyComments from "./NotifyComments";
import NotifyLikes from "./NotifyLikes";

export default function Notification({ classes }) {
  const [commentsCount, setCommentsCount] = useState(0);
  const [likesCount, setLikesCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    setTotalCount(commentsCount + likesCount);
  }, [commentsCount, likesCount]);

  return (
    <ExpansionPanel className={classes.sidebarCard}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.sidebarCardHeader}
      >
        <Notifications className={classes.sidebarCardHeaderElements} />
        <Typography className={classes.sidebarCardHeaderElements}>
          Notifications
        </Typography>
        <Badge color="secondary" badgeContent={totalCount} showZero></Badge>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box
          style={{
            display: "flex",
            height: "250px",
            overflowY: "auto",
            width: "100%"
          }}
        >
          <Grid container direction="column" wrap="nowrap">
            <NotifyComments setCount={setCommentsCount} />
            <NotifyLikes setCount={setLikesCount} />
          </Grid>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}
