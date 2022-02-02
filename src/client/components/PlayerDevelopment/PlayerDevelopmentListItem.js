import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from '@mui/styles';
import { getDateDDMMYYYY, getDateYYYYMMDD, getDateMMDDYY} from '../../util/util';
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
        {/* <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography> */}
      </Box>
    </Box>
  );
}

function PlayerDevelopmentListItem(props) {
  const { val, index, maxDate, displayRowArr, selectedRoles } = props;
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
        {val.weights.filter(x=>x.role === 'player' ).map((weight, index) => {
          return (
            <Box
              key={weight.competency + index}
              sx={{ width: "100%" }}
             
            >
              <p className="displaydate">{`${getDateMMDDYY(weight.assessment_date)},${weight.role },(${weight.assigned_weight})`}</p>
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
      <div className="parent-coach-rating">
      {val.weights.filter(x=>x.role === 'parent' || x.role === 'coach').filter(x => !!selectedRoles.find(y => y === x.role)).map((weight, index) => { // checkboxes
        return (
          <div>
            {/* <div title={`${weight.role} has given ${weight.assigned_weight} rating on ${getDateDDMMYYYY(new Date(weight.assessment_date))}`} className={`score-dot ${weight.assigned_weight <= 4
              ? 'red-bg' : weight.assigned_weight >= 5 && weight.assigned_weight <= 7
                ? 'yellow-bg' : 'green-bg'}`} key={weight.role} data-rating={`${weight.assigned_weight}0`} data-date={getDateDDMMYYYY(new Date(weight.assessment_date))} style={{ left: weight.assigned_weight + '0%' }}>
              {weight.role === 'coach' ? 'C' : 'P'}
            </div> */}

             <div title={`${weight.role} has given ${weight.assigned_weight} rating on ${getDateDDMMYYYY(new Date(weight.assessment_date))}`} className={`score-dot ${weight.role == "parent"
              ? 'parent-bg' : 'coach-bg'}`} key={weight.role} data-rating={`${weight.assigned_weight}`} style={{ left: weight.assigned_weight + '0%' }} >
              <div className={`${weight.assigned_weight <= 4
                ? 'sd-red' : weight.assigned_weight >= 5 && weight.assigned_weight <= 7
                  ? 'sd-yellow' : 'sd-green'}`} >
                {weight.assigned_weight}
                  </div>
              {weight.role === 'coach' ? 'C' : 'P'}
            </div>
            </div>
           
          );
        })}
      </div>
    </ListItem>
  );
}

export default PlayerDevelopmentListItem;
