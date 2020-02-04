import React from "react";
import {
  Box,
  Grid,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "@material-ui/core";
import ForumIcon from "@material-ui/icons/Forum";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";

import ChatWrapper from "./ChatWrapper";

function Contacts({ classes, username, userId }) {
  return (
    <ExpansionPanel className={classes.sidebarCard}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.sidebarCardHeader}
      >
        <ForumIcon className={classes.sidebarCardHeaderElements} />
        <Typography className={classes.sidebarCardHeaderElements}>
          Discussion instantanée
        </Typography>
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
            <ChatWrapper
              username={username}
              classes={classes}
              userId={userId}
            />
          </Grid>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.username,
    userId: state.userReducer.id
  };
};

export default connect(mapStateToProps)(Contacts);
