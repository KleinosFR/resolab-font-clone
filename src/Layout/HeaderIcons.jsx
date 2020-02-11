import React from "react";
import { Settings, ExitToApp } from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import { useHistory } from "react-router-dom";

import TimerComponent from "../Layout/TimerComponent";
import { LOGOUT } from "../utils/Events";
import { removeToken } from "../reducers/actions";

function HeaderIcons({ logOut, socket, role }) {
  const history = useHistory();

  const handleLogout = () => {
    logOut();
    chatLogout(socket);
  };

  const chatLogout = socket => {
    socket.emit(LOGOUT);
    socket.disconnect();
  };

  const handleAdmin = () => {
    console.log("going to admin page");
    history.push("/admin");
  };

  return (
    <Grid item xs={3}>
      <Grid container spacing={3} justify="space-evenly">
        <Grid item xs={6}>
          <TimerComponent />
        </Grid>
        <Grid item xs={3}>
          {role === "ROLE_ADMIN" && (
            <Fab>
              <Settings onClick={handleAdmin} />
            </Fab>
          )}
        </Grid>
        <Grid item xs={3}>
          <Fab>
            <ExitToApp onClick={handleLogout} />
          </Fab>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapdispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(removeToken())
  };
};

const mapStateToProps = state => {
  return {
    socket: state.socketReducer.socket,
    role: state.userReducer.roles[0]
  };
};

export default connect(mapStateToProps, mapdispatchToProps)(HeaderIcons);
