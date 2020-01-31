import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Favorite from "@material-ui/icons/Favorite";
import House from "@material-ui/icons/House";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

import gitlogo from "../Assets/github-gradient.png";
import linkedinlogo from "../Assets/linkedin-gradient.png";
import DeveloperInfo from "../commonComponent/DeveloperInfo";

import Stef from "../Assets/Stef.jpg";
import clara from "../Assets/clara.jpg";
import angelique from "../Assets/angelique.png";
import photomonia from "../Assets/photomonia.jpg";
import anneclaire from "../Assets/anneclaire.jpg";

const useStyles = makeStyles(theme => ({
  footer: {
    position: "fixed",
    bottom: "0px",
    width: "100%",
    textAlign: "center",
    height: "3rem",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[800]
        : theme.palette.grey[200]
  },
  hover: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "70vw"
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "800",
      display: "flex"
    }
  }
}));

function StickyFooter({ isAuth, link }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [developers] = useState([
    {
      name: "Stéphane Lavaud",
      linkedin: "https://www.linkedin.com/in/stephane-lavaud-webdev/",
      github: "https://github.com/KleinosFR",
      picture: Stef
    },
    {
      name: "Clara Desperben",
      linkedin: "https://www.linkedin.com/in/clara-desperben/",
      github: "https://github.com/clarade",
      picture: clara
    },
    {
      name: "Angélique Wons",
      linkedin: "https://www.linkedin.com/in/ang%C3%A9lique-wons/",
      github: "https://github.com/angelique-w",
      picture: angelique
    },
    {
      name: "Monia Polus",
      linkedin: "https://www.linkedin.com/in/monia-polus/",
      github: "https://github.com/Monia64",
      picture: photomonia
    },
    {
      name: "Anne-Claire Nanot",
      linkedin: "https://www.linkedin.com/in/anne-claire-nanot/",
      github: "https://github.com/anneclaire64",
      picture: anneclaire
    }
  ]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <>
      {!isAuth && (
        <div>
          <CssBaseline />
          <footer className={classes.footer}>
            <Container maxWidth="sm" xs="2" className={classes.hover}>
              <Grid container spacing={3}>
                <Grid item xs={8}>
                  <Typography
                    variant="body1"
                    className="footer"
                    onClick={handleOpenModal}
                  >
                    Made with <Favorite color="Secondary" fontSize="small" /> by
                    Wild Code School Biarritz
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    <a
                      style={{
                        textDecoration: "none"
                      }}
                      href="http://www.aditu.fr/"
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      {" "}
                      Hébergé
                      <House color="Primary" fontSize="small" style={{}} /> par
                      Aditu
                    </a>
                  </Typography>
                </Grid>
              </Grid>
            </Container>
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleCloseModal}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500
              }}
            >
              <Fade in={open}>
                <Grid
                  container
                  className={classes.paper}
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  {developers.map(dev => {
                    return <DeveloperInfo {...dev} />;
                  })}
                </Grid>
              </Fade>
            </Modal>
          </footer>
        </div>
      )}
    </>
  );
}

const mapStateToProps = state => {
  return {
    isAuth: state.authReducer.isAuth
  };
};

export default connect(mapStateToProps)(StickyFooter);
