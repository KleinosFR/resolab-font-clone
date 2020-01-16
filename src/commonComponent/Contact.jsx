import React, { useState } from "react";
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
  TextField,
  InputAdornment
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SendIcon from "@material-ui/icons/Send";
import ForumIcon from "@material-ui/icons/Forum";
import { Warning, PermIdentity } from "@material-ui/icons";
import RemoveOutlinedIcon from "@material-ui/icons/RemoveOutlined";

function Contact({ contact, classes }) {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [alert, setAlert] = useState(false);

  const openChat = () => {
    setChatVisibility(true);
  };

  const closeChat = () => {
    setChatVisibility(false);
  };

  const handleClickAlert = () => {
    setAlert(!alert);
  };

  return (
    <>
      <ListItem
        key={contact.id}
        style={{
          paddingTop: "0px",
          paddingBottom: "0px"
        }}
        onClick={openChat}
        button
      >
        <ListItemAvatar>
          <AccountCircleIcon />
        </ListItemAvatar>
        <ListItemText
          primary={contact.username}
          secondary={`${contact.roles[0]}`}
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
            <Typography className={classes.username}>Discussion</Typography>
          }
          action={
            <>
              <IconButton aria-label="alert">
                {alert ? (
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

        <CardContent>
          <Typography>chat</Typography>
        </CardContent>
        <TextField
          // error={isError}
          // helperText={helperText}
          // value={value}
          // onChange={onChange}
          id="input-with-icon-textfield"
          label="Ecrire un message"
          fullWidth
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendIcon style={{ cursor: "pointer" }} />
              </InputAdornment>
            )
          }}
        />
      </Card>
    </>
  );
}

export default Contact;
