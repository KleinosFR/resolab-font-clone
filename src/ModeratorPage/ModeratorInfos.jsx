import React from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanel
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import VerifiedUser from "@material-ui/icons/VerifiedUser";

function ModeratorInfo({ classes }) {
  // useSelector permet de mapsStateToProps sans passer par Connect
  const username = useSelector(state => state.userReducer.username);
  const firstName = useSelector(state => state.userReducer.firstname);
  const lastName = useSelector(state => state.userReducer.lastName);

  return (
    <ExpansionPanel className={classes.sidebarCard}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.sidebarCardHeader}
      >
        <VerifiedUser className={classes.sidebarCardHeaderElements} />
        <Typography className={classes.sidebarCardHeaderElements}>
          {firstName} {lastName}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>{username}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default ModeratorInfo;
