import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";
import CustomizedSnackbars from "../../commonComponent/SnackBar";

const apiUrl = process.env.REACT_APP_API_URL;

function UserTable({
  users,
  token,
  refresh,
  schools,
  classrooms,
  handleSnackBar
}) {
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

  const handleDelete = userId => {
    axios
      .delete(`${apiUrl}/users/${userId}`, config)
      .then(res => {
        handleSnackBar("L'utilisateur a été supprimé", "success");
        refresh();
      })
      .catch(err => handleSnackBar("Il y a eu un problème", "error"));
  };

  const handleUpdate = (userId, payload) => {
    axios
      .put(`${apiUrl}/users/${userId}`, payload, config)
      .then(res => {
        handleSnackBar("L'utilisateur a été modifié", "success");
        refresh();
      })
      .catch(err => handleSnackBar("Il y a eu un problème", "error"));
  };

  return (
    <div>
      <MaterialTable
        columns={[
          { title: "Utilisateur", field: "username" },
          { title: "Prénom", field: "firstname" },
          {
            title: "Nom",
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
          },
          {
            title: "Accès autorisé",
            field: "isActive",
            type: "boolean"
          }
        ]}
        data={users}
        title="Utilisateurs"
        editable={{
          isEditable: rowData => rowData.name === "a", // only name(a) rows would be editable
          isDeletable: rowData => rowData.name === "b", // only name(a) rows would be deletable
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              let payload = { ...newData };
              if (payload.classRoom.id === "0") {
                payload = {
                  ...payload,
                  classRoom: null
                };
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
        options={{ pageSize: "10", pageSizeOptions: [10, 20, 50] }}
        localization={{
          pagination: {
            labelDisplayedRows: "{from}-{to} sur {count}",
            labelRowsSelect: "lignes",
            labelRowsPerPage: "lignes",
            firstTooltip: "première page",
            previousTooltip: "page précédente",
            nextTooltip: "page suivante",
            lastTooltip: "dernière page"
          },
          toolbar: {
            nRowsSelected: "{0} enregistrement(s) selectionné(s)",
            searchTooltip: "Rechercher",
            searchPlaceholder: "rechercher..."
          },
          header: {
            actions: "Actions"
          },
          body: {
            emptyDataSourceMessage: "Aucun enregistrement",
            filterRow: {
              filterTooltip: "Filtrer"
            },
            editRow: {
              cancelTooltip: "Annuler",
              saveTooltip: "Confirmer",
              deleteText:
                "Etes-vous certain de vouloir supprimer cet utilisateur ? Tous ses contenus seront supprimés"
            },
            addTooltip: "Ajouter",
            deleteTooltip: "Supprimer",
            editTooltip: "Modifier"
          }
        }}
      />
    </div>
  );
}

export default UserTable;
