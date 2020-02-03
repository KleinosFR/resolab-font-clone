import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  Grid,
  InputLabel,
  Box,
  Container
} from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import { useEffect } from "react";

const apiUrl = process.env.REACT_APP_MEDIA_URL;

function CreateUser({ token, schools, classrooms, handleSnackBar, refresh }) {
  const [payload, setPayload] = useState({
    _username: "",
    _password: ""
  });
  const [userSchool, setUserSchool] = useState(0);
  const [userClassroom, setUserClassroom] = useState(0);

  const [allschools, setAllschools] = useState([{}]);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  useEffect(() => {
    setAllschools(schools);
  }, [schools]);

  const handleSubmit = async e => {
    e.preventDefault();
    await axios
      .post(`${apiUrl}/register`, payload, config)
      .then(res => {
        handleSnackBar("L'utilisateur a été créé", "success");
        refresh();
      })
      .catch(err =>
        handleSnackBar(
          "Il y a eu un problème, l'utilisateur existe peut-être déjà",
          "error"
        )
      );
  };

  return (
    <Container>
      <form onSubmit={e => handleSubmit(e)}>
        <Grid>
          <TextField
            label="Nom d'utilisateur"
            required
            value={payload._username}
            onChange={e =>
              setPayload({
                ...payload,
                _username: e.target.value
              })
            }
          />
        </Grid>
        <Grid>
          <TextField
            label="Mot de passe"
            required
            value={payload._password}
            onChange={e =>
              setPayload({
                ...payload,
                _password: e.target.value
              })
            }
          />
        </Grid>

        <Grid>
          <Button type="submit">Enregistrer</Button>
        </Grid>
      </form>
    </Container>
  );
}

const mapStateToProps = state => {
  return { token: state.authReducer.token };
};

export default connect(mapStateToProps)(CreateUser);
