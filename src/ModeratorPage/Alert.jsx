import React from "react";
import { ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { connect } from "react-redux";

import AlertInfo from "./AlertInfo";
import { setAlert } from "../reducers/actions";

function Alert({ alert, setAlert }) {
  const openAlert = () => {
    setAlert(alert);
  };

  return (
    <ListItem
      key={alert.id}
      style={{
        paddingTop: "0px",
        paddingBottom: "0px"
      }}
      button
      onClick={() => openAlert()}
    >
      <ListItemAvatar>
        <FiberManualRecordIcon
          fontSize="small"
          color={alert.takenCare ? "action" : "secondary"}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${alert.user.username} a lancé une alerte`}
        secondary={
          <>
            <AlertInfo alert={alert} />
            {alert.moderator && (
              <div>Pris en charge par {alert.moderator.username}</div>
            )}
          </>
        }
      />
    </ListItem>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    setAlert: alert => dispatch(setAlert(alert))
  };
};

const mapStateToProps = state => ({
  openAlert: state.alertReducer.alert
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
