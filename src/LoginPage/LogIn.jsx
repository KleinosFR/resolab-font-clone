import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  Button,
  Grid
} from "@material-ui/core";
import { VpnKey, Person } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Axios from "axios";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import { LOGIN, SET_USER } from "../reducers/actionTypes";
import VoidField from "./VoidField";
import Loader from "./Loader";
import DisplayError from "./DisplayError";
import { useGet } from "restful-react";

import { storeToken, setUser } from "../reducers/actions";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(4)
  }
}));

function LogIn({ storeToken, setUser, roles, isAuth }) {
  const classes = useStyles();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLogginError, setIsLogginError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [userRole, setUserRole] = useState("");

  let history = useHistory();

  useEffect(() => {
    if (isAuth) {
      switch (roles[0]) {
        case "ROLE_STUDENT":
          history.push("/user");
          break;
        case "ROLE_MODERATOR":
          history.push("/moderator");
          break;
        case "ROLE_ADMIN":
          history.push("/moderator");
          break;
        case "ROLE_SUPER_ADMIN":
          history.push("/moderator");
          break;
        default:
          break;
      }
    }
  }, [roles]);

  const handleLogin = async () => {
    if (login.length > 0 || password.length > 0) {
      try {
        setIsLoading(true);
        const postRes = await Axios.post(
          "http://localhost:8089/api/login_check",
          {
            username: login,
            password: password
          }
        );
        storeToken(postRes.data.token);
        const getRes = await Axios.get("http://localhost:8089/api/users", {
          headers: {
            Authorization: "Bearer " + postRes.data.token,
            Accept: "application/json"
          }
        });
        const userList = getRes.data;
        const userData = userList.filter(user => user.username === login);
        setUserRole(userData[0].roles[0]);
        setUser(userData[0]);
        // setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      }
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item className={classes.margin}>
          Connecte toi à Résolab
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <FormControl className={classes.margin} required>
          <InputLabel htmlFor="userLogin">Ton nom d'utilisateur</InputLabel>
          <Input
            id="userLogin"
            error={isLogginError}
            startAdornment={
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            }
            value={login}
            onChange={e => setLogin(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <FormControl className={classes.margin} required>
          <InputLabel htmlFor="password">Ton mot de passe</InputLabel>
          <Input
            id="password"
            type="password"
            error={isPasswordError}
            startAdornment={
              <InputAdornment position="start">
                <VpnKey />
              </InputAdornment>
            }
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />
        </FormControl>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleLogin()}
        >
          Se connecter
        </Button>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.margin}
      >
        <VoidField
          isVoid={isLogginError}
          fieldName="nom d'utilisateur"
          className={classes.margin}
        />
        <VoidField
          isVoid={isPasswordError}
          fieldName="mot de passe"
          className={classes.margin}
        />
        <DisplayError isError={isError} />
      </Grid>
      <Loader isLoading={isLoading} />
    </>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    storeToken: token => dispatch(storeToken(token)),
    setUser: user => dispatch(setUser(user))
  };
};

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.isAuth,
    roles: state.userReducer.roles
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
