import React from "react";
import { useSelector } from "react-redux";

import "../Layout/Scroll.css";
import ModeratorInfos from "../ModeratorPage/ModeratorInfos";
import Alerts from "../ModeratorPage/Alerts";
import UserInfo from "../UserPage/UserInfo";
import Notifications from "./Notifications/NotificationsWrapper";
import DiscussContacts from "./Chat/ChatPanel";

export default function Sidebar({ classes }) {
  const role = useSelector(state => state.userReducer.roles[0]);

  return (
    <div style={{ position: "fixed", top: "300px" }}>
      {(role === "ROLE_MODERATOR" || role === "ROLE_ADMIN") && (
        <>
          <ModeratorInfos classes={classes} />
          <Alerts classes={classes} />
        </>
      )}
      {role === "ROLE_STUDENT" && <UserInfo classes={classes} />}
      <Notifications classes={classes} />
      <DiscussContacts classes={classes} />
    </div>
  );
}
