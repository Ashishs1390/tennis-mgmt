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
    const {val,index} = props;
  return (
    <ListItem className="CompetancyListItem" key={val.competency + index}>
      <div>
        {val.competency}
        <Box sx={{ width: "100%" }}>
          <LinearProgressWithLabel colors="success" value={parseInt(`${7}0`)} />
        </Box>
      </div>
    </ListItem>
  );
}

export default PlayerDevelopmentListItem;
