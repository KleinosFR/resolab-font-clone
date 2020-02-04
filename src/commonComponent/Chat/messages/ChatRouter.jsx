import React, { useEffect, useState } from "react";
import { CardContent } from "@material-ui/core";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { orderBy } from "lodash";

function ChatRouter({
  messages,
  privateMessages,
  user,
  typingUsers,
  sendMessage,
  sendTyping,
  fetchedMessages,
  isOnline,
  activeChat,
  receiver,
  socketReceiver,
  fetchDb,
  getLastMessage
}) {
  const [oldMessages, setOldMessages] = useState([]);

  useEffect(
    () => {
      const orderedMessages = orderBy(fetchedMessages, ["createdAt"], ["asc"]);

      const messagesFormated = orderedMessages.map(mes => {
        return {
          id: mes.uuid,
          message: mes.message,
          receiverId: mes.receiver_id,
          senderId: mes.sender_id,
          receiver: mes.receiver_id === user.id ? user.name : receiver.username,
          sender: mes.sender_id === user.id ? user.name : receiver.username
        };
      });
      setOldMessages(messagesFormated);
    },
    // eslint-disable-next-line
    [fetchedMessages]
  );

  useEffect(() => {
    if (privateMessages !== undefined && privateMessages.length) {
      getLastMessage(privateMessages);
    } else {
      oldMessages.length > 0 && getLastMessage(oldMessages);
    }
  });

  return (
    <>
      <CardContent>
        <Messages
          oldMessages={oldMessages}
          newMessages={messages}
          user={user}
          typingUsers={typingUsers}
          isOnline={isOnline}
        />
      </CardContent>
      <MessageInput
        sendMessage={message => sendMessage(message)}
        sendTyping={isTyping => sendTyping(isTyping)}
        isOnline={isOnline}
        senderId={user.id}
        receiverId={receiver.id}
        fetchDb={fetchDb}
      />
    </>
  );
}

export default ChatRouter;
