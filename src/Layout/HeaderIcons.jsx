import React from "react";
import { Settings, ExitToApp } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";

import { LOGOUT } from "../utils/Events";
import { removeToken } from "../reducers/actions";

function HeaderIcons({ logOut, socket }) {
  const handleLogout = () => {
    logOut();
    chatLogout(socket);
  };

  const chatLogout = socket => {
    socket.emit(LOGOUT);
  };

  return (
    <>
      <Grid
        container
        spacing={5}
        direction="row"
        justify="space-around"
        align-items="baseline"
      >
        <Fab color="default">
          <Settings color="default" />
        </Fab>
        <Fab color="default">
          <ExitToApp color="default" onClick={handleLogout} />
        </Fab>
      </Grid>
    </>
  );
}

const mapdispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(removeToken())
  };
};

const mapStateToProps = state => {
  return {
    socket: state.socketReducer.socket
  };
};

export default connect(mapStateToProps, mapdispatchToProps)(HeaderIcons);
