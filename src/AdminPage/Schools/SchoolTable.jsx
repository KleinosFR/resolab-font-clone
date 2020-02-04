import React from "react";
import MaterialTable from "material-table";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function SchoolTable({ token, refresh, schools, handleSnackBar }) {
  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  const handleDelete = id => {
    axios
      .delete(`${apiUrl}/schools/${id}`, config)
      .then(res => {
        if (res.status === 200) {
          handleSnackBar("L'établissement a été supprimé", "success");
          refresh();
        } else if (res.status === 500) {
          handleSnackBar(
            "Cette établissement a des classes ratachées",
            "error"
          );
        }
      })
      .catch(err => handleSnackBar("Il y a eu un problème", "error"));
  };

  const handleUpdate = (id, payload) => {
    axios
      .put(`${apiUrl}/schools/${id}`, payload, config)
      .then(res => {
        handleSnackBar("L'établissement a été modifié");
        refresh();
      })
      .catch(err => handleSnackBar("Il y a eu un problème", "error"));
  };

  const handleCreate = payload => {
    axios
      .post(`${apiUrl}/schools`, payload, config)
      .then(res => {
        handleSnackBar("L'établissement a été créé", "success");
        refresh();
      })
      .catch(err => handleSnackBar("Il y a eu un problème", "error"));
  };

  return (
    <div>
      <MaterialTable
        columns={[
          {
            title: "Etablissement",
            field: "name"
          }
        ]}
        data={schools}
        options={{ pageSize: "10", pageSizeOptions: [10, 20, 50] }}
        title="Liste des Etablissements"
        editable={{
          isEditable: rowData => rowData.name === "a", // only name(a) rows would be editable
          isDeletable: rowData => rowData.name === "b", // only name(a) rows would be deletable
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              handleCreate(newData);
              resolve();
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              handleUpdate(oldData.id, newData);
              resolve();
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              handleDelete(oldData.id);
              resolve();
            })
        }}
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

export default SchoolTable;
