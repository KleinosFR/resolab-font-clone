import React, { useState, useEffect } from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  IconButton,
  Typography,
  Badge
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ForumIcon from "@material-ui/icons/Forum";
import { Warning } from "@material-ui/icons";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";
import Messages from "../messages/Messages";
import MessageInput from "../messages/MessageInput";
import axios from "axios";
import { connect } from "react-redux";
import { orderBy, find, last } from "lodash";
import ChatRouter from "../messages/ChatRouter";

const chatUrl = process.env.REACT_APP_CHAT_URL;
const apiUrl = process.env.REACT_APP_API_URL;

function Contact({
  receiver,
  socketReceiver,
  classes,
  addChat,
  chat,
  user,
  activeChat,
  setActiveChat,
  sendTyping,
  sendMessage,
  token,
  connectedUsers,
  retrieveOnlineUsers
}) {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  const [chatVisibility, setChatVisibility] = useState(false);
  const [isAlert, setIsAlert] = useState(false);
  const [userChat, setUserChat] = useState(chat[0]);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const [lastMessage, setLastMessage] = useState("");
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [senderId, setSenderId] = useState(user.id);
  const [receiverId, setReceiverId] = useState(receiver.id);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    fetchDbMessages();
  }, [receiver, user]);

  useEffect(() => {
    setActiveChat(chat[0]);
    setUserChat(chat[0]);
  }, [chat[0]]);

  useEffect(() => {
    console.log("user connected to chat");
    find(connectedUsers, { id: receiver.id })
      ? setIsOnline(true)
      : setIsOnline(false);
    retrieveOnlineUsers(connectedUsers);
  }, [connectedUsers]);

  const getLastMessage = messages => {
    const lastMes = last(messages);
    if (lastMes !== lastMessage) {
      lastMessage !== "" && setNewMessagesCount(newMessagesCount + 1);
      lastMessage !== "" && setIsNewMessage(true);
      setLastMessage(lastMes);
    }
  };

  //   const toto = [{}, {}, {}];

  // const filteredToto = toto.filter(x => x.isRead === false);

  // const res = await Promise.all(
  //     filteredToto.map(x => {
  //         return Axios.post();
  //     })
  // );

  const fetchDbMessages = async () => {
    await axios
      .get(`${chatUrl}/userMessage/${senderId}/${receiverId}`, config)
      .then(res => {
        setFetchedMessages(res.data);
      })
      .catch(err => console.log(err));
  };

  const openChat = async () => {
    if (userChat === undefined) {
      receiver.isOnline &&
        (await addChat(socketReceiver.name, socketReceiver.id));
      setChatVisibility(true);
    } else {
      setChatVisibility(true);
      receiver.isOnline && setActiveChat(chat[0]);
      receiver.isOnline && setUserChat(chat[0]);
    }
    setIsNewMessage(false);
    setNewMessagesCount(0);
  };

  const closeChat = () => {
    setChatVisibility(false);
  };

  const handleClickAlert = async () => {
    try {
      const postChatAlert = axios.post(
        `${apiUrl}/alerts`,
        {
          user: `api/users/${user.id}`,
          users: [
            {
              id: `${user.id}`,
              username: `${user.name}`,
              role: "sender"
            },
            {
              id: `${receiver.id}`,
              username: `${receiver.username}`,
              role: "receiver"
            }
          ]
        },
        config
      );
      await Promise.all([postChatAlert]);
      setIsAlert(true);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  };

  return (
    <>
      <ListItem
        style={{
          paddingTop: "0px",
          paddingBottom: "0px"
        }}
        onClick={openChat}
        button
      >
        <ListItemAvatar>
          <Badge
            badgeContent={
              isNewMessage && !chatVisibility ? newMessagesCount : 0
            }
            color="primary"
          >
            <AccountCircleIcon
              style={receiver.isOnline ? { color: "lightgreen" } : {}}
            />
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={receiver.username}
          secondary={lastMessage && lastMessage.message}
        />
      </ListItem>

      <Card
        className={
          chatVisibility
            ? classes.chatWindowVisible
            : classes.chatWindowNoVisible
        }
      >
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              <ForumIcon />
            </Avatar>
          }
          title={
            <Typography className={classes.username}>
              {`Discussion avec ${receiver.username}`}
            </Typography>
          }
          action={
            <>
              <IconButton aria-label="alert">
                {isAlert ? (
                  <Warning color="secondary" onClick={handleClickAlert} />
                ) : (
                  <Warning color="disabled" onClick={handleClickAlert} />
                )}
              </IconButton>
              <IconButton aria-label="alert">
                <RemoveOutlinedIcon onClick={closeChat} />
              </IconButton>
            </>
          }
        />
        <ChatRouter
          messages={activeChat && activeChat.messages}
          privateMessages={chat[0] && chat[0].messages}
          user={user}
          socketReceiver={socketReceiver}
          typingUsers={activeChat && activeChat.typingUsers}
          sendMessage={message =>
            sendMessage(
              activeChat.id,
              socketReceiver.name,
              socketReceiver.id,
              message
            )
          }
          sendTyping={isTyping => sendTyping(activeChat.id, isTyping)}
          fetchedMessages={fetchedMessages}
          isOnline={receiver.isOnline}
          activeChat={activeChat}
          receiver={receiver}
          fetchDb={fetchDbMessages}
          getLastMessage={message => getLastMessage(message)}
        />
      </Card>
    </>
  );
}

const mapStateToProps = state => {
  return {
    token: state.authReducer.token,
    connectedUsers: state.connectedUsersReducer.connectedUsers
  };
};

export default connect(mapStateToProps)(Contact);
