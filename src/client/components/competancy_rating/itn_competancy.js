import * as React from "react";
import { makeStyles } from "@mui/styles";
import Competancy from "./competancy";
import Typography from "@mui/material/Typography";
const useStyles = makeStyles({
  title: {
    fontSize: "20px !important",
  },
});

function ItnComprtancy() {
  const classes = useStyles();
  return (
    <div>
      <Typography
        sx={{ display: "inline" }}
        component="h4"
        variant="body2"
        color="text.primary"
        className={classes.title}
      >
        Physical
      </Typography>
      {[1, 2, 3, 4, 5].map((x) => (
        <Competancy questionNo={x} />
      ))}
    </div>
  );
}

export default ItnComprtancy;
