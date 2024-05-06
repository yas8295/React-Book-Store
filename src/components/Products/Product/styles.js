import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    background: "linear-gradient(45deg, #D9D9D9 30%, #E6E6E6 90%)",
  },
  media: {
    height: "100%",
    paddingTop: "105%",
    "&:hover": {
      backgroundColor: "#2a344a",
      boxShadow: "none",
    },
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  },
  button: {
    background: "#0d1b25",
    color: "white",
    width: "100%",
    height: "40px",

    "&:hover": {
      backgroundColor: "#2a344a",
      boxShadow: "none",
    },
    "&:disabled": {
      backgroundColor: "#0d1b25",
      opacity: 0.7,
      cursor: "not-allowed",
    },
  },
  cardContentName: {
    fontSize: 20,
    textAlign: "center",
    margin: "4px !important",
    fontWeight: 500,
  },
  cardContentPrice: {
    fontSize: 20,
    color: "#F1361D",
    margin: "0 !important",
  },
  "@media (max-width: 700px)": {
    cardContentName: {
      fontSize: 14,
      textAlign: "center",
    },
    cardContentPrice: {
      fontSize: 16,
    },
  },
}));
