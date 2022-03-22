import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from '@mui/styles';
import { getDateDDMMYYYY, getDateYYYYMMDD, getDateMMDDYY } from '../../util/util';
import "./PlayerDevelopment.scss";

const useStyles = makeStyles({
  rootYellow: {
    height: "7px",
    "&.MuiLinearProgress-colorPrimary:not(.MuiLinearProgress-buffer)": {
      backgroundColor: "#fbf5ed",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#fbf5ed",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#f3a73c",
    },
    "& .MuiLinearProgress-dashedColorPrimary": {
      backgroundImage:
        "radial-gradient(#fbf5ed 0%, #fbf5ed 16%, transparent 42%)",
    },
  },
  rootRed: {
    height: "7px",
    "&.MuiLinearProgress-colorPrimary:not(.MuiLinearProgress-buffer)": {
      backgroundColor: "#f3e8e9",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#f3e8e9",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#ea3943",
    },
    "& .MuiLinearProgress-dashedColorPrimary": {
      backgroundImage:
        "radial-gradient(#f3e8e9 0%, #f3e8e9 16%, transparent 42%)",
    },
  },
  rootGreen: {
    height: "7px",
    "&.MuiLinearProgress-colorPrimary:not(.MuiLinearProgress-buffer)": {
      backgroundColor: "#f0fdf0",
    },
    "& .MuiLinearProgress-colorPrimary": {
      backgroundColor: "#f0fdf0",
    },
    "& .MuiLinearProgress-barColorPrimary": {
      backgroundColor: "#0ec30e",
    },
    "& .MuiLinearProgress-dashedColorPrimary": {
      backgroundImage:
        "radial-gradient(#f0fdf0 0%, #f0fdf0 16%, transparent 42%)",
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
        {/* <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography> */}
      </Box>
    </Box>
  );
}

function PlayerDevelopmentListItem(props) {
  const { val, index, maxDate, displayRowArr, selectedRoles, hideScores } = props;
  const propsStyle = {
    backgroundColor: "black",
    color: "red",
  };
  const classes = useStyles(propsStyle);
  return (
    <ListItem className="CompetancyListItem" key={val.competency + index}>
      <div>
        <p className="displaycomp">{val.competency}</p>
        {val.weights.filter(x => x.role === 'player').map((weight, index) => {
          return (
            <Box
              key={weight.competency + index}
              sx={{ width: "100%" }}

            >
              <p className="displaydate">{`${getDateMMDDYY(weight.assessment_date)},${weight.role},(${weight.assigned_weight})`}</p>
              <LinearProgressWithLabel
                colors="success"
                classes={
                  weight.assigned_weight <= 4
                    ? { root: classes.rootRed }
                    : weight.assigned_weight >= 5 && weight.assigned_weight <= 7
                      ? { root: classes.rootYellow }
                      : { root: classes.rootGreen }
                }
                value={parseInt(`${weight.assigned_weight || 0}0`)}
              >

              </LinearProgressWithLabel>
              <div className="parent-coach-rating">
                {val.weights.filter(x => x.role === 'parent' || x.role === 'coach').filter(x => !!selectedRoles.find(y => y === x.role)).map((weight1, index) => { // checkboxes
                  return (
                    <div className={`${getDateMMDDYY(weight.assessment_date) == getDateMMDDYY(weight1.assessment_date) ? 'pbshow' : 'pbHide'}`}>
                      <div title={`${weight1.role} has given ${weight1.assigned_weight} rating on ${getDateDDMMYYYY(new Date(weight1.assessment_date))}`} className={`score-dot ${weight1.role == "parent"
                        ? 'parent-bg' : 'coach-bg'}`} key={weight1.role} data-rating={`${weight1.assigned_weight}`} style={{ left: weight1.assigned_weight + '0%' }} >
                        <div className={`${weight1.role === 'coach' ? 'coachPosition' : 'parentPosition'} ${weight1.assigned_weight <= 4
                          ? 'sd-red' : weight1.assigned_weight >= 5 && weight1.assigned_weight <= 7
                            ? 'sd-yellow' : 'sd-green'} ${hideScores == true ? 'pbshow' : 'pbHide'}`} >
                          {weight1.assigned_weight}
                        </div>
                        {weight1.role === 'coach' ? 'C' : 'P'}
                      </div>
                    </div>

                  );
                })}
              </div>
            </Box>
          );
        })}
      </div>

    </ListItem>
  );
}

export default PlayerDevelopmentListItem;
