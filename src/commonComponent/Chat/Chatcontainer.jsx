import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayContacts from "./DisplayContacts/DisplayContacts";

import {
  COMMUNITY_CHAT,
  MESSAGE_SENT,
  MESSAGE_RECIEVED,
  TYPING,
  PRIVATE_MESSAGE,
  USER_CONNECTED,
  USER_DISCONNECTED
} from "../../utils/Events";
import { values } from "lodash";
import { setConnectedUsers } from "../../reducers/actions";

class ChatContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chats: [],
      users: [],
      activeChat: null
    };
  }

  componentDidUpdate() {
    this.props.setConnectedUsers(this.state.users);
  }

  componentDidMount() {
    const { socket } = this.props;
    this.initSocket(socket);
  }

  componentWillUnmount() {
    const { socket } = this.props;
    socket.off(PRIVATE_MESSAGE);
    socket.off(USER_CONNECTED);
    socket.off(USER_DISCONNECTED);
  }

  initSocket(socket) {
    socket.emit(COMMUNITY_CHAT, this.resetChat);
    socket.on(PRIVATE_MESSAGE, this.addChat);
    socket.on("connect", () => {
      socket.emit(COMMUNITY_CHAT, this.resetChat);
    });
    socket.on(USER_CONNECTED, users => {
      this.setState({ users: values(users) });
    });
    socket.on(USER_DISCONNECTED, users => {
      this.setState({ users: values(users) });
    });
  }

  sendOpenPrivateMessage = (receiverName, receiverId) => {
    const { socket, user } = this.props;
    socket.emit(PRIVATE_MESSAGE, {
      reciever: receiverName,
      recieverId: receiverId,
      sender: user.name,
      senderId: user.id,
      activeChat: null
    });
  };

  /*
   *	Reset the chat back to only the chat passed in.
   * 	@param chat {Chat}
   */
  resetChat = chat => {
    return this.addChat(chat, true);
  };

  /*
   *	Adds chat to the chat container, if reset is true removes all chats
   *	and sets that chat to the main chat.
   *	Sets the message and typing socket events for the chat.
   *
   *	@param chat {Chat} the chat to be added.
   *	@param reset {boolean} if true will set the chat as the only chat.
   */
  addChat = (chat, reset = false) => {
    const { socket } = this.props;
    const { chats } = this.state;

    const newChats = reset ? [chat] : [...chats, chat];
    this.setState({
      chats: newChats,
      activeChat: reset ? chat : this.state.activeChat
    });

    const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`;
    const typingEvent = `${TYPING}-${chat.id}`;

    socket.on(typingEvent, this.updateTypingInChat(chat.id));
    socket.on(messageEvent, this.addMessageToChat(chat.id));
  };

  /*
   * 	Returns a function that will
   *	adds message to chat with the chatId passed in.
   *
   * 	@param chatId {number}
   */
  addMessageToChat = chatId => {
    return message => {
      const { chats } = this.state;
      let newChats = chats.map(chat => {
        if (chat.id === chatId) chat.messages.push(message);
        return chat;
      });

      this.setState({ chats: newChats });
    };
  };

  /*
   *	Updates the typing of chat with id passed in.
   *	@param chatId {number}
   */
  updateTypingInChat = chatId => {
    return ({ isTyping, user }) => {
      if (user !== this.props.user.name) {
        const { chats } = this.state;

        let newChats = chats.map(chat => {
          if (chat.id === chatId) {
            if (isTyping && !chat.typingUsers.includes(user)) {
              chat.typingUsers.push(user);
            } else if (!isTyping && chat.typingUsers.includes(user)) {
              chat.typingUsers = chat.typingUsers.filter(u => u !== user);
            }
          }
          return chat;
        });
        this.setState({ chats: newChats });
      }
    };
  };

  /*
   *	Adds a message to the specified chat
   *	@param chatId {number}  The id of the chat to be added to.
   *	@param message {string} The message to be added to the chat.
   */
  sendMessage = (chatId, receiver, receiverId, message) => {
    const { socket } = this.props;
    socket.emit(MESSAGE_SENT, { chatId, receiver, receiverId, message });
  };

  /*
   *	Sends typing status to server.
   *	chatId {number} the id of the chat being typed in.
   *	typing {boolean} If the user is typing still or not.
   */
  sendTyping = (chatId, isTyping) => {
    const { socket } = this.props;
    socket.emit(TYPING, { chatId, isTyping });
  };

  setActiveChat = activeChat => {
    this.setState({ activeChat });
  };
  render() {
    const { user, logout, classes } = this.props;
    const { chats, activeChat, users } = this.state;
    return (
      <div className="container">
        <DisplayContacts
          logout={logout}
          chats={chats}
          user={user}
          users={users}
          activeChat={activeChat}
          setActiveChat={chat => this.setActiveChat(chat)}
          onSendPrivateMessage={this.sendOpenPrivateMessage}
          classes={classes}
          sendTyping={(chatId, isTyping) => this.sendTyping(chatId, isTyping)}
          sendMessage={(chatId, receiver, receiverId, message) =>
            this.sendMessage(chatId, receiver, receiverId, message)
          }
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setConnectedUsers: connectedUsers =>
      dispatch(setConnectedUsers(connectedUsers))
  };
};

const mapStateToProps = state => ({
  connectedUsers: state.connectedUsersReducer.connectedUsers
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);
