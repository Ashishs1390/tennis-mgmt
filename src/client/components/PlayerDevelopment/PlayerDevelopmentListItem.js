import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// import { makeStyles } from '@mui/styles';
import "./PlayerDevelopment.scss";

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
  return (
    <ListItem className="CompetancyListItem" key={val.competency + index}>
      <div>
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
              />
            </Box>
          );
        })}
      </div>
    </ListItem>
  );
}

export default PlayerDevelopmentListItem;
