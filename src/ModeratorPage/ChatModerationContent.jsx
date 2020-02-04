import React, { useEffect, useState } from "react";
import { Typography, Paper, Box } from "@material-ui/core";
import axios from "axios";
import { orderBy } from "lodash";

function ChatModerationContent({ openAlert, token }) {
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [nearestOpenAlert, setnearestOpenAlert] = useState({});
  const sender = openAlert.users[0];
  const receiver = openAlert.users[1];
  const chatUrl = process.env.REACT_APP_CHAT_URL;
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };
  useEffect(
    () => {
      fetchDbMessages();
    },
    // eslint-disable-next-line
    []
  );

  const findNearestDate = (array, date) => {
    let value = array[0];
    for (let i = 0; i < array.length; i++) {
      let gap = date - Date.parse(array[i].createdAt);
      if (gap < date - Date.parse(value.createdAt)) {
        value = array[i];
      }
      if (Math.sign(gap) === -1) {
        return value;
      }
    }
  };

  const displayNearestMessages = (array, index) => {
    if (index - 20 > 0) {
      console.log(index, array.length);
      return array.slice(index - 20);
    } else {
      console.log("tableau entier " + array);
      return array;
    }
  };

  const fetchDbMessages = async () => {
    await axios
      .get(`${chatUrl}/userMessage/${sender.id}/${receiver.id}`, config)
      .then(res => {
        const messages = res.data;
        const updatedMessages = orderBy(messages, ["createdAt"], "asc");
        console.log(updatedMessages);
        const goal = Date.parse(openAlert.createdAt);
        const nearestOpenAlertDate = findNearestDate(updatedMessages, goal);
        console.log(nearestOpenAlertDate);
        setnearestOpenAlert(nearestOpenAlertDate);
        const index =
          updatedMessages[1] &&
          updatedMessages.findIndex(
            el => el.createdAt === nearestOpenAlertDate.createdAt
          );
        console.log(index);
        const displayMessages = displayNearestMessages(updatedMessages, index);
        setFetchedMessages(displayMessages);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Typography>
        {sender.username} a lancé une alerte sur la discussion entre{" "}
        {sender.username} et {receiver.username} :
      </Typography>
      <Typography>
        Extrait des derniers messages échangés au moment de l'alerte :
      </Typography>
      <Paper elevation={1}>
        <Box p={2}>
          {fetchedMessages.map(message => {
            if (message.sender_id == sender.id) {
              return (
                <Typography style={{ textAlign: "left" }}>
                  {sender.username}: {message.message}
                </Typography>
              );
            }
            if (message.sender_id == receiver.id) {
              return (
                <Typography style={{ textAlign: "left" }}>
                  {receiver.username}: {message.message}
                </Typography>
              );
            }
          })}
        </Box>
      </Paper>
    </>
  );
}

export default ChatModerationContent;
