import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  button: {
    background: "#001524",
    color: "white",
    width: "100%",
    height: "40px",

    "&:hover": {
      backgroundColor: "#2a344a",
      boxShadow: "none",
    },
    "&:disabled": {
      backgroundColor: "#001524",
      opacity: 0.7,
      cursor: "not-allowed !important",
    },
  },
}));
