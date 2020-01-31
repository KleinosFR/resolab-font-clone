import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import axios from "axios";

import "../../Layout/Scroll.css";
import WebcamComponent from "../WebcamComponent";

const mediaUrl = process.env.REACT_APP_MEDIA_URL;
const apiUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 600,
      display: "flex"
    }
  }
}));

function PostArticle({ id, token, handleSnackBar }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [description, setDescription] = useState("");

  const config = {
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json"
    }
  };

  useEffect(() => {
    if (image) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeImage = e => {
    setImage(e.target.files[0]);
    console.log(image);
  };

  const handleChangeDescription = e => {
    setDescription(e.target.value);
  };

  const handleSubmit = e => {
    console.log(description, image);
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", image);

    axios
      .post(`${apiUrl}/media_objects`, formData, config)
      .then(res => {
        console.log(res);
        return axios.post(
          `${apiUrl}/posts`,
          {
            description: description,
            photo: mediaUrl + res.data.contentUrl,
            likes: 0,
            user: `/api/users/${id}`
          },
          config
        );
      })
      .then(res => {
        console.log(res);
        setPreviewImage(null);
        setImage(null);
        setDescription("");
        return handleSnackBar("Ta publication a bien été postée");
      })
      .catch(err => console.log(err))
      .finally(() => handleClose());
  };

  return (
    <div className="scroll-post-article">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Button>
          <AddCircleOutlineIcon style={{ fontSize: 80 }} onClick={handleOpen} />
        </Button>
        <p style={{ fontFamily: "Roboto" }}>Ajouter une nouvelle photo</p>
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Box
              id="transition-modal-title"
              textAlign="center"
              p={4}
              fontSize={24}
              fontWeight="fontWeightBold"
            >
              Nouvelle publication
            </Box>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div className="scroll-publication">
                {image ? (
                  <img
                    src={previewImage}
                    alt=""
                    style={{ maxHeight: "50vh", width: "auto" }}
                  />
                ) : (
                  <WebcamComponent setImage={setImage} />
                )}
                <button type="button" onClick={() => setImage(null)}>
                  Reprendre la photo
                </button>
                <TextField
                  id="outlined-full-width"
                  label="Ajouter une photo via l'ordinateur"
                  type="file"
                  style={{ margin: 18 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  onChange={handleChangeImage}
                />
                <TextField
                  id="outlined-full-width"
                  label="Description"
                  style={{ margin: 18 }}
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  multiline
                  rows="4"
                  variant="outlined"
                  value={description}
                  onChange={handleChangeDescription}
                />
                <Button
                  type="submit"
                  style={{ margin: 18 }}
                  color="secondary"
                  variant="contained"
                >
                  Poster
                </Button>
              </div>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  id: state.userReducer.id,
  token: state.authReducer.token
});

export default connect(mapStateToProps)(PostArticle);
