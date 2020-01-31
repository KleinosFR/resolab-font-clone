import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import { orderBy, findIndex } from "lodash";
import axios from "axios";
import { connect } from "react-redux";

import Contact from "./Contact";

const apiUrl = process.env.REACT_APP_API_URL;

class DisplayContacts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reciever: "",
      allUsers: [],
      searchUser: ""
    };
  }

  componentWillMount() {
    console.log("Display contacts mounts");
    this.fetchUsers(1, []);
    setTimeout(this.retrieveOnlineUsers(this.props.connectedUsers), 500);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.connectedUsers !== prevProps.connectedUsers) {
      this.retrieveOnlineUsers(this.props.connectedUsers);
    }
  }

  retrieveOnlineUsers(usersArray) {
    const { allUsers } = this.state;
    const { userInfos } = this.props;
    const updatedUsers = allUsers.map(usr => {
      let isOnline = false;
      usersArray.some(connectUser => {
        if (usr.id === connectUser.id) {
          isOnline = true;
        }
      });
      return { ...usr, isOnline };
    });
    const filtereduUsers =
      userInfos.isRestricted && userInfos.role[0] === "ROLE_STUDENT"
        ? updatedUsers.filter(
            user =>
              user.role[0] !== "ROLE_STUDENT" ||
              user.classroom.id === userInfos.classroom.id
          )
        : updatedUsers;

    this.setState({ allUsers: filtereduUsers });
  }

  async fetchUsers(page, previousUsers) {
    // retreiving all users from database until there is no more users
    const nextPage = page + 1;
    await axios
      .get(`${apiUrl}/users?page=${page}`, {
        headers: {
          Authorization: "Bearer " + this.props.token,
          Accept: "application/json"
        }
      })
      .then(async res => {
        const fetchedUsers = res.data;
        let allFetchedUsers = previousUsers.concat(
          fetchedUsers.filter(user => user.id !== this.props.user.id)
        );
        await axios
          .get(`${apiUrl}/users?page=${nextPage}`, {
            headers: {
              Authorization: "Bearer " + this.props.token,
              Accept: "application/json"
            }
          })
          .then(res => {
            if (res.data.length !== 0) {
              this.fetchUsers(nextPage, allFetchedUsers);
            } else {
              this.setState({
                allUsers: orderBy(allFetchedUsers)
              });
            }
          });
      })

      .catch(err => console.log("error", err));
  }

  render() {
    const {
      chats,
      activeChat,
      user,
      setActiveChat,
      users,
      classes
    } = this.props;
    const { reciever, allUsers, searchUser } = this.state;
    return (
      <div id="side-bar">
        <TextField
          label="Rechercher un contact"
          variant="outlined"
          size="small"
          value={searchUser}
          onChange={e => this.setState({ searchUser: e.target.value })}
        />

        <div
          className="users"
          ref="users"
          onClick={e => {
            e.target === this.refs.user && setActiveChat(null);
          }}
        >
          {allUsers &&
            orderBy(allUsers, ["isOnline"], "desc")
              .filter(user => user.username.includes(searchUser))
              .map(usr => {
                return (
                  <Contact
                    activeChat={activeChat}
                    key={usr.id}
                    user={user}
                    receiver={usr}
                    retrieveOnlineUsers={userArray =>
                      this.retrieveOnlineUsers(userArray)
                    }
                    socketReceiver={users.find(rcvr => rcvr.id === usr.id)}
                    classes={classes}
                    addChat={(receiverName, receiverId) =>
                      this.props.onSendPrivateMessage(receiverName, receiverId)
                    }
                    chat={chats.filter(chat => {
                      const user0 = chat.users[0];
                      const user1 = chat.users[1];
                      return (
                        (user0 === user.name && user1 === usr.username) ||
                        (user1 === user.name && user0 === usr.username)
                      );
                    })}
                    setActiveChat={chat => this.props.setActiveChat(chat)}
                    sendTyping={(chatId, isTyping) =>
                      this.props.sendTyping(chatId, isTyping)
                    }
                    sendMessage={(chatId, receiver, receiverId, message) =>
                      this.props.sendMessage(
                        chatId,
                        receiver,
                        receiverId,
                        message
                      )
                    }
                  />
                );
              })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    connectedUsers: state.connectedUsersReducer.connectedUsers,
    token: state.authReducer.token,
    userInfos: state.userReducer
  };
};

export default connect(mapStateToProps)(DisplayContacts);
