import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from '@mui/styles';
import "./PlayerDevelopment.scss";

const useStyles = makeStyles({
  rootYellow: {
    height: "7px",
    "&.MuiLinearProgress-colorPrimary:not(.MuiLinearProgress-buffer)": {
      backgroundColor: "#f6ce95",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#f6ce95",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#f3a73c",
    },
    "& .MuiLinearProgress-dashedColorPrimary": {
      backgroundImage:
        "radial-gradient(#f6ce95 0%, #f6ce95 16%, transparent 42%)",
    },
  },
  rootRed: {
    height: "7px",
    "&.MuiLinearProgress-colorPrimary:not(.MuiLinearProgress-buffer)": {
      backgroundColor: "#eb9a9e",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#eb9a9e",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#ea3943",
    },
    "& .MuiLinearProgress-dashedColorPrimary": {
      backgroundImage:
        "radial-gradient(#eb9a9e 0%, #eb9a9e 16%, transparent 42%)",
    },
  },
  rootGreen: {
    height: "7px",
    "&.MuiLinearProgress-colorPrimary:not(.MuiLinearProgress-buffer)": {
      backgroundColor: "#96e596",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#96e596",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#0ec30e",
    },
    "& .MuiLinearProgress-dashedColorPrimary": {
      backgroundImage:
        "radial-gradient(#96e596 0%, #96e596 16%, transparent 42%)",
    },
  },
});

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function PlayerDevelopmentListItem(props) {
  const { val, index, maxDate, displayRowArr } = props;

  console.log("-----------maxDate------------");
  console.log(val);
  console.log(maxDate);
  console.log(displayRowArr);
  const propsStyle = {
    backgroundColor: "black",
    color: "red",
  };
  const classes = useStyles(propsStyle);
  return (
    <ListItem className="CompetancyListItem" key={val.competency + index}>
      <div>
        {/* <div className={`${classes.foo} ${classes.bar}`} >aaaa</div> */}
        <p className="displaycomp">{val.competency}</p>

        {val.weights.map((weight, index) => {
          return (
            <Box
              sx={{ width: "100%" }}
              className={
                displayRowArr.includes(weight.assessment_date)
                  ? "pbshow"
                  : "pbHide"
              }
            >
              <p className="displaydate">{weight.assessment_date}</p>
              <LinearProgressWithLabel
                colors="success"
                classes={
                  weight.assigned_weight <= 4
                    ? { root: classes.rootRed }
                    : weight.assigned_weight >= 5 && weight.assigned_weight <= 7
                    ? { root: classes.rootYellow }
                    : { root: classes.rootGreen }
                }
                value={parseInt(`${weight.assigned_weight}0`)}
              />
            </Box>
          );
        })}
      </div>
    </ListItem>
  );
}

export default PlayerDevelopmentListItem;
