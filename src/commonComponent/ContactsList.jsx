import React, { useEffect } from "react";
import { List } from "@material-ui/core";

import Contact from "./Contact";
import { useRecursiveGet } from "../hooks/useApi";

function ContactsList({ classes }) {
  const { datas, request } = useRecursiveGet("/users", 10000);

  useEffect(() => {
    request();
  }, []);

  return (
    <List>
      {datas &&
        datas.map(contact => <Contact contact={contact} classes={classes} />)}
    </List>
  );
}

// export default ContactsList;
