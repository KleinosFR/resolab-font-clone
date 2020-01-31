import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 500,
    maxWidth: 800
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    backgroundSize: "contain"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",

    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  storie: {
    width: 100,
    height: 100,
    borderRadius: "50%"
  },
  username: {
    fontWeight: 1000
  },
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    maxHeight: 300
  },
  inline: {
    display: "inline"
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
    padding: theme.spacing(2, 4, 3)
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 600,
      display: "flex"
    }
  },
  sidebarCard: {
    maxWidth: 350,
    maxHeight: 350,
    margin: 8
  },
  sidebarCardHeader: {
    backgroundColor: "#f2f2f2"
  },
  sidebarCardHeaderElements: {
    marginRight: "8px",
    marginLeft: "8px"
  },
  chatWindowVisible: {
    width: "40vw",
    maxHeight: "50vh",
    minHeight: "45vh",
    position: "fixed",
    bottom: "10px",
    left: "0px",
    zIndex: "100",
    backgroundColor: "rgba(255,255,255,1)",
    visibility: "visible"
  },
  chatWindowNoVisible: {
    width: "40vw",
    maxHeight: "40vh",
    position: "fixed",
    bottom: "0px",
    left: "0px",
    zIndex: "100",
    visibility: "hidden"
  },
  footerModal: {
    id: "transition-modal-title",
    textAlign: "center",
    p: 4,
    fontSize: 24,
    fontWeight: "fontWeightBold",
    display: "flex",
    flexDirection: "row"
  },

  dividerAlert: {
    marginTop: 16,
    marginBottom: 16
  }
}));
