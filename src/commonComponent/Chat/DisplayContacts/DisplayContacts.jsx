import React, { Component } from "react";
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
      allUsers: []
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
    const updatedUsers = allUsers.map(usr => {
      let isOnline = false;
      usersArray.some(connectUser => {
        if (usr.id === connectUser.id) {
          isOnline = true;
        }
      });
      return { ...usr, isOnline };
    });
    this.setState({ allUsers: updatedUsers });
  }

  async fetchUsers(page, previousUsers) {
    // retreiving all users from database until there is no more post
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
    const { reciever, allUsers } = this.state;
    return (
      <div id="side-bar">
        <form onSubmit={this.handleSubmit} className="search">
          <input
            placeholder="Search"
            type="text"
            value={reciever}
            onChange={e => {
              this.setState({ reciever: e.target.value });
            }}
          />
          <div className="plus"></div>
        </form>
        <div
          className="users"
          ref="users"
          onClick={e => {
            e.target === this.refs.user && setActiveChat(null);
          }}
        >
          {allUsers &&
            orderBy(allUsers, ["isOnline"], "desc").map(usr => {
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
    token: state.authReducer.token
  };
};

export default connect(mapStateToProps)(DisplayContacts);
