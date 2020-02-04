import React, { useState } from "react";
import {
  Badge,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Box,
  Grid
} from "@material-ui/core";
import { NotificationImportant } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import AlertsList from "./AlertsList";

function Alerts({ classes }) {
  const [alertCount, setAlertCount] = useState(0);
  return (
    <ExpansionPanel className={classes.sidebarCard}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
        className={classes.sidebarCardHeader}
      >
        <NotificationImportant className={classes.sidebarCardHeaderElements} />
        <Typography className={classes.sidebarCardHeaderElements}>
          Alertes
        </Typography>
        <Badge
          color="secondary"
          badgeContent={alertCount}
          showZero
          style={{ flexDirection: "row", alignItems: "center" }}
        ></Badge>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Box
          style={{
            display: "flex",
            height: "250px",
            overflowY: "auto",
            width: "100%"
          }}
        >
          <Grid container direction="column" wrap="nowrap">
            <AlertsList classes={classes} setAlertCount={setAlertCount} />
          </Grid>
        </Box>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default Alerts;
