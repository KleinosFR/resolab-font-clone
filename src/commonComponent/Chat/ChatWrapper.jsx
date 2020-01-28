import React, { Component } from "react";
import io from "socket.io-client";
import { USER_CONNECTED, LOGOUT, VERIFY_USER } from "../../utils/Events";
import ChatContainer from "./Chatcontainer";
import { connect } from "react-redux";

import { storeSocket } from "../../reducers/actions";

const socketUrl = process.env.REACT_APP_WEBSOCKET_URL;

class ChatWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      user: this.props.user,
      error: ""
    };
  }

  componentWillMount() {
    this.initSocket();
  }

  /*
   *	Connect to and initializes the socket.
   */
  initSocket = () => {
    const socket = io(socketUrl);
    const nickname = this.props.username;
    const userId = this.props.userId;
    socket.on("connect", () => {
      console.log("Connected");
    });
    this.setState({ socket });
    sessionStorage.setItem("socket", socket);
    this.props.storeSocket(socket);
    socket.emit(VERIFY_USER, nickname, userId, this.setUserVerify);
  };

  /*
   * 	Sets the user property in state
   *	@param user {id:number, name:string}
   */

  setUser = user => {
    const { socket } = this.state;
    socket.emit(USER_CONNECTED, user);
    this.setState({ user });
  };

  setUserVerify = ({ user, isUser }) => {
    if (isUser) {
      this.setError("User name taken");
    } else {
      this.setError("");
      this.setUser(user);
    }
  };

  /*
   *	Sets the user property in state to null.
   */
  logout = () => {
    const { socket } = this.state;
    socket.emit(LOGOUT);
    this.setState({ user: null });
  };
  setError = error => {
    this.setState({ error });
  };

  render() {
    const { socket, user } = this.state;
    const { classes } = this.props;
    return (
      <div className="container">
        <ChatContainer
          socket={socket}
          user={user}
          logout={this.logout}
          classes={classes}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeSocket: socket => dispatch(storeSocket(socket))
  };
};

const mapStateToProps = state => {
  return {
    user: state.userReducer
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatWrapper);
