import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import CustomizedSnackbars from "../../commonComponent/SnackBar";

const apiUrl = process.env.REACT_APP_API_URL;

function UserTable({ users, token, refresh, schools, classrooms }) {
  const [snackBarNotification, setSnackBarNotification] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [schoolsList, setSchoolsList] = useState({});
  const [classroomsList, setClassroomsList] = useState({});

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  useEffect(() => {
    let formatedSchools = {};
    for (let i = 0; i < schools.length; i++) {
      const key = schools[i].id;
      formatedSchools[key] = schools[i].name;
    }
    setSchoolsList(formatedSchools);

    let formatedClassrooms = { "0": "Aucune" };
    for (let i = 0; i < classrooms.length; i++) {
      const key = classrooms[i].id;
      formatedClassrooms[
        key
      ] = `${classrooms[i].name} - ${classrooms[i].school.name}`;
    }
    setClassroomsList(formatedClassrooms);
  }, [schools, classrooms]);

  const handleSnackBar = message => {
    setSnackBarNotification(true);
    setSnackbarMessage(message);
  };

  const handleDelete = userId => {
    axios
      .delete(`${apiUrl}/users/${userId}`, config)
      .then(res => {
        handleSnackBar("L'utilisateur a été supprimé");
        refresh();
      })
      .catch(err => console.log(err));
  };

  const handleUpdate = (userId, payload) => {
    axios
      .put(`${apiUrl}/users/${userId}`, payload, config)
      .then(res => {
        handleSnackBar("L'utilsateur a été modifié");
        refresh();
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <MaterialTable
        columns={[
          { title: "Utilisateur", field: "username" },
          { title: "Nom", field: "firstname" },
          {
            title: "Prénom",
            field: "lastname"
          },
          {
            title: "sexe",
            field: "gender",
            lookup: { male: "homme", female: "femme" }
          },
          {
            title: "date de naissance",
            field: "birthday",
            type: "date"
          },
          {
            title: "Role",
            field: "roles[0]",
            lookup: {
              ROLE_STUDENT: "Utilisateur",
              ROLE_MODERATOR: "Modérateur",
              ROLE_ADMIN: "Administrateur"
            }
          },
          {
            title: "Classe",
            field: "classRoom.id",
            lookup: classroomsList,
            emptyValue: "Aucune"
          },
          {
            title: "Etablissement",
            field: "classRoom.school.id",
            lookup: schoolsList,
            editable: "never"
          },
          {
            title: "Utilisateur restreint",
            field: "isRestricted",
            type: "boolean"
          }
        ]}
        data={users}
        title="Utilisateurs"
        editable={{
          isEditable: rowData => rowData.name === "a", // only name(a) rows would be editable
          isDeletable: rowData => rowData.name === "b", // only name(a) rows would be deletable
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                console.log(newData);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              console.log(newData.classRoom.id, newData);

              let payload = { ...newData };
              if (payload.classRoom.id === "0") {
                payload = {
                  ...payload,
                  classRoom: null
                };
                console.log(payload);
              } else {
                payload = {
                  ...payload,
                  classRoom: `/api/class_rooms/${newData.classRoom.id}`
                };
              }

              handleUpdate(oldData.id, payload);
              resolve();
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              handleDelete(oldData.id);
              resolve();
            })
        }}
      />
      <CustomizedSnackbars
        open={snackBarNotification}
        setOpen={setSnackBarNotification}
        handleSnackBar={handleSnackBar}
        message={snackbarMessage}
      />{" "}
      />
    </div>
  );
}

export default UserTable;
