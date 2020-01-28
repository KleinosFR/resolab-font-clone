import React, { useEffect, useState } from "react";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Grid
} from "@material-ui/core";
import { Face, ExpandMore } from "@material-ui/icons";
import { connect } from "react-redux";
import axios from "axios";

const baseUrl = process.env.REACT_APP_MEDIA_URL;

function UserInfo({
  classes,
  username,
  firstName,
  lastname,
  classroom,
  token
}) {
  const [userClassroom, setuserClassroom] = useState("");

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}${classroom}`, config)
      .then(res => setuserClassroom(res.data.name));
  });

  return (
    <ExpansionPanel className={classes.sidebarCard}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.sidebarCardHeader}
      >
        <Face className={classes.sidebarCardHeaderElements} />
        <Typography className={classes.sidebarCardHeaderElements}>
          {firstName} {lastname}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid>
          <Typography>{username}</Typography>
          <Typography>
            Ton établissement scolaire : {classroom.school.name}
          </Typography>
          <Typography>Ta classe : {classroom.name}</Typography>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

const mapStateToProps = state => {
  return {
    username: state.userReducer.username,
    firstName: state.userReducer.firstname,
    lastname: state.userReducer.lastname,
    classroom: state.userReducer.classroom,
    token: state.authReducer.token
  };
};

export default connect(mapStateToProps)(UserInfo);
