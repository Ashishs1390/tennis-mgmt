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
    // height: "40px",
    "&.MuiLinearProgress-colorPrimary:not(.MuiLinearProgress-buffer)": {
      backgroundColor: "#f6ce95",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#f6ce95",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#f0ad4e",
    },
    "& .MuiLinearProgress-dashedColorPrimary": {
      backgroundImage:
        "radial-gradient(#f6ce95 0%, #f6ce95 16%, transparent 42%)",
    },
  },
  rootRed: {
    // height: "40px",
    "&.MuiLinearProgress-colorPrimary:not(.MuiLinearProgress-buffer)": {
      backgroundColor: "#563434",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#563434",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#b14c4c",
    },
    "& .MuiLinearProgress-dashedColorPrimary": {
      backgroundImage:
        "radial-gradient(#563434 0%, #563434 16%, transparent 42%)",
    },
  },
  rootGreen: {
    // height: "40px",
    "&.MuiLinearProgress-colorPrimary:not(.MuiLinearProgress-buffer)": {
      backgroundColor: "#ADFF2F",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#ADFF2F",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#228B22",
    },
    "& .MuiLinearProgress-dashedColorPrimary": {
      backgroundImage:
        "radial-gradient(#ADFF2F 0%, #ADFF2F 16%, transparent 42%)",
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
        {val.competency}
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
              <LinearProgressWithLabel
                colors="success"
                value={parseInt(`${weight.assigned_weight}0`)}
                classes={
                  weight.assigned_weight >= 4
                    ? { root: classes.rootRed }
                    : (weight.assigned_weight >= 6 || weight.assigned_weight <= 8)
                    ? { root: classes.rootYellow }
                    : { root: classes.rootGreen }
                }
              />
            </Box>
          );
        })}
      </div>
    </ListItem>
  );
}

export default PlayerDevelopmentListItem;
