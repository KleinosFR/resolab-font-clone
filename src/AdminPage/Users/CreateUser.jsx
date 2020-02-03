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

function CreateUser({ token, schools, classrooms, handleSnackBar }) {
  const [payload, setPayload] = useState({
    _username: "",
    _password: "",
    firstname: "",
    lastname: "",
    gender: "male",
    roles: ["ROLE_STUDENT", "ROLE_USER"],
    birthday: "2010-01-01"
  });
  const [userSchool, setUserSchool] = useState(0);
  const [userClassroom, setUserClassroom] = useState(0);

  const [allschools, setAllschools] = useState([
    { id: 0, name: "wild code school" }
  ]);

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  useEffect(() => {
    setAllschools(schools);
  }, [schools]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/register`, payload, config)
      .then(res => handleSnackBar("L'utilisateur a été créé", "success"))
      .catch(err => handleSnackBar("Il y a eu un problème", "error"));
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
          <TextField
            label="Nom"
            value={payload.lastname}
            onChange={e => setPayload({ ...payload, lastname: e.target.value })}
          />
        </Grid>
        <Grid>
          <TextField
            label="Prénom"
            value={payload.firstname}
            onChange={e =>
              setPayload({
                ...payload,
                firstname: e.target.value
              })
            }
          />
        </Grid>
        <Grid>
          <InputLabel id="userGender">Sexe</InputLabel>
          <Select
            labelId="userGender"
            value={payload.gender}
            onChange={e => setPayload({ ...payload, gender: e.target.value })}
          >
            <MenuItem value={"male"}>Homme</MenuItem>
            <MenuItem value={"female"}>Femme</MenuItem>
          </Select>
        </Grid>
        <Grid>
          <InputLabel id="userRole">Rôle</InputLabel>
          <Select
            labelId="userRole"
            value={payload.roles}
            onChange={e => setPayload({ ...payload, roles: e.target.value })}
          >
            <MenuItem value={["ROLE_STUDENT", "ROLE_USER"]}>
              Utilisateur
            </MenuItem>
            <MenuItem value={["ROLE_MODERATOR", "ROLE_USER"]}>
              Modérateur
            </MenuItem>
            <MenuItem value={["ROLE_ADMIN", "ROLE_USER"]}>
              Administrateur
            </MenuItem>
          </Select>
        </Grid>
        <Grid>
          <TextField
            label="Date de naissance"
            type="date"
            defaultValue="2010-01-01"
            onChange
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
        <Grid>
          <InputLabel id="usersSchool">Etablissement</InputLabel>
          <Select
            labelId="usersSchool"
            value={userSchool}
            onChange={e => setUserSchool(e.target.value)}
          >
            {/* {allschools &&
                            allschools.map(school => {
                                return (
                                    <MenuItem value={school.id}>
                                        {school.name}
                                    </MenuItem>
                                );
                            })} */}
          </Select>
        </Grid>
        <Grid>
          <InputLabel id="usersClassroom">Etablissement</InputLabel>
          <Select
            labelId="usersClassroom"
            value={userSchool}
            onChange={e => setUserClassroom(e.target.value)}
          >
            {/* {classrooms &&
                            classrooms.map(school => {
                                return (
                                    <MenuItem value={school.id}>
                                        {school.name}
                                    </MenuItem>
                                );
                            })} */}
          </Select>
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
