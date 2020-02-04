import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function ClassroomTable({
  users,
  token,
  refresh,
  schools,
  classrooms,
  handleSnackBar
}) {
  const [schoolsList, setSchoolsList] = useState({});

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
  }, [schools]);

  const handleDelete = id => {
    axios
      .delete(`${apiUrl}/class_rooms/${id}`, config)
      .then(res => {
        handleSnackBar("La classe a été supprimée", "success");
        refresh();
      })
      .catch(err => handleSnackBar("Il y a eu un problème", "error"));
  };

  const handleUpdate = (id, payload) => {
    axios
      .put(`${apiUrl}/class_rooms/${id}`, payload, config)
      .then(res => {
        handleSnackBar("La classe a été modifiée", "success");
        refresh();
      })
      .catch(err => handleSnackBar("Il y a eu un problème", "error"));
  };

  const handleCreate = payload => {
    axios
      .post(`${apiUrl}/class_rooms`, payload, config)
      .then(res => {
        handleSnackBar("La classe a été créée", "success");
        refresh();
      })
      .catch(err => handleSnackBar("Il y a eu un problème", "error"));
  };

  return (
    <div>
      <MaterialTable
        columns={[
          {
            title: "Classe",
            field: "name"
          },
          {
            title: "Etablissement",
            field: "school.id",
            lookup: schoolsList
          }
        ]}
        data={classrooms}
        options={{ pageSize: "10", pageSizeOptions: [10, 20, 50] }}
        title="List des Classes"
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              const payload = {
                ...newData,
                school: `/api/schools/${newData.school.id}`
              };
              handleCreate(payload);
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              const payload = {
                ...newData,
                school: `/api/schools/${newData.school.id}`
              };
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
                "Etes-vous sur de vouloir supprimer cet enregistrement ?"
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

export default ClassroomTable;
