import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Tabs, Tab, Typography, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import CustomizedSnackbars from "../commonComponent/SnackBar";
import Layout from "../Layout/Layout";
import TabPanel from "./TabPanel";
import CreateUser from "./Users/CreateUser";
import UserTable from "./Users/UserTable";
import SchoolTable from "./Schools/SchoolTable";
import ClassroomTable from "./Classrooms/ClassroomTable";

const apiUrl = process.env.REACT_APP_API_URL;

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  tabWrapper: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    marginTop: "143px"
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: "150px",
    overflow: "visible"
  }
}));

function AdminPage({ token }) {
  const [allUsers, setAllUsers] = useState({});
  const [allSchools, setAllSchools] = useState({});
  const [allClassrooms, setAllClassrooms] = useState({});

  const [snackBarNotification, setSnackBarNotification] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackBarColor, setSnackBarColor] = useState("success");

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  const fetchRessource = async (
    page,
    previousRessourceData,
    ressource,
    setData
  ) => {
    // retreiving all ressources from database until it finds an empty page
    const nextPage = page + 1;
    let ressourceData = previousRessourceData;
    await axios
      .get(`${apiUrl}${ressource}?page=${page}`, config)
      .then(async res => {
        const fetchedRessourceData = res.data;
        ressourceData = ressourceData.concat(fetchedRessourceData);
        await axios
          .get(`${apiUrl}${ressource}?page=${nextPage}`, config)
          .then(res => {
            if (res.data.length !== 0) {
              fetchRessource(nextPage, ressourceData, ressource);
            } else {
              setData(ressourceData);
            }
          });
      })

      .catch(err => console.log("error", err));
  };

  const history = useHistory();

  const fetchAll = () => {
    fetchRessource(1, [], "/schools", setAllSchools);
    fetchRessource(1, [], "/users", setAllUsers);
    fetchRessource(1, [], "/class_rooms", setAllClassrooms);
  };

  useEffect(() => {
    // retrieving all the data
    fetchAll();
  }, []);
  const handleExit = () => {
    history.push("/moderator");
  };

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSnackBar = (message, color) => {
    setSnackBarNotification(true);
    setSnackbarMessage(message);
    color ? setSnackBarColor(color) : setSnackBarColor("success");
  };

  return (
    <Layout>
      <div className={classes.tabWrapper}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          className={classes.tabs}
        >
          <Tab label="Créer un utilisateur" {...a11yProps(0)} />
          <Tab label="Gérer les utilisateurs" {...a11yProps(1)} />
          <Tab label="Gérer les établissements" {...a11yProps(2)} />
          <Tab label="Gérer les classes" {...a11yProps(3)} />
          <Button onClick={() => handleExit()}>Retour</Button>
        </Tabs>
        <TabPanel value={value} index={0}>
          <CreateUser
            schools={allSchools}
            classrooms={allClassrooms}
            handleSnackBar={handleSnackBar}
            refresh={() => fetchAll()}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <UserTable
            users={allUsers}
            token={token}
            refresh={() => fetchAll()}
            schools={allSchools}
            classrooms={allClassrooms}
            handleSnackBar={handleSnackBar}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SchoolTable
            token={token}
            refresh={() => fetchAll()}
            schools={allSchools}
            handleSnackBar={handleSnackBar}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ClassroomTable
            token={token}
            refresh={() => fetchAll()}
            schools={allSchools}
            classrooms={allClassrooms}
            handleSnackBar={handleSnackBar}
          />
        </TabPanel>
        <CustomizedSnackbars
          open={snackBarNotification}
          setOpen={setSnackBarNotification}
          handleSnackBar={handleSnackBar}
          message={snackbarMessage}
          color={snackBarColor}
        />{" "}
      </div>
    </Layout>
  );
}

const mapStateToProps = state => {
  return { token: state.authReducer.token };
};

export default connect(mapStateToProps)(AdminPage);
