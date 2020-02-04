import React, { useState, useEffect } from "react";
import { List } from "@material-ui/core";
import { orderBy, filter } from "lodash";

import Alert from "./Alert";
import { useRecursiveGet } from "../hooks/useApi";

function AlertsList({ classes, setAlertCount }) {
  const { datas, request } = useRecursiveGet("/alerts", 10000);
  const [orderedAlertsByTakenInCharge, setOrderedAlerts] = useState([]);

  useEffect(() => {
    request();
    const orderedAlerts = datas && orderBy(datas, ["takenCare"], ["asc"]);
    setOrderedAlerts(orderedAlerts);
  }, []);

  useEffect(() => {
    const unresolvedAlerts = datas && filter(datas, ["resolved", false]);
    datas && setAlertCount(unresolvedAlerts.length);
    const orderedAlerts = datas && orderBy(datas, ["takenCare"], ["asc"]);
    setOrderedAlerts(orderedAlerts);
  }, [datas]);

  return (
    <List>
      {orderedAlertsByTakenInCharge &&
        orderedAlertsByTakenInCharge.map(alert => (
          <>
            {!alert.resolved && (
              <Alert key={alert.id} alert={alert} classes={classes} />
            )}
          </>
        ))}
    </List>
  );
}

export default AlertsList;
