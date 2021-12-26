import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./PlayerDevelopment.scss";

import { getCompetancy } from "./../../redux/index";
import { connect } from "react-redux";

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

function PlayerDevelopment(props) {
  console.log(props);
  const [progress, setProgress] = React.useState(0);
  const [compData, setCompetancyData] = useState([]);
  const { getCompetancy, competancyData } = props;
  useEffect(() => {
    setProgress((prevProgress) => prevProgress + 20);
  }, []);

  useEffect(() => {
    getCompetancy();
  }, []);

  useEffect(() => {
    console.log("-------------competancyData------------------");
    if (competancyData.length != 0) {
      console.log(competancyData);
      setCompetancyData([...competancyData]);
    }
  }, [competancyData]);

  return (
    <div className="PlayerAssessmentPage">
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        player development plans -skill view
      </Typography>
      <p></p>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <List className="MainCompetancyList">
            {compData.map((item, index) => {
              return (
                <ListItem className="CompetancyListItem" key={item.competency_bundle}>
                  <ListItemText className="CompetancyBundleLabel">{item.competency_bundle}</ListItemText>
                  <List className = "SubCompetancyList">
                    {item.values.map((val, index) => {
                      return (
                        <ListItem className="CompetancyListItem" key={val.competency+index}>
                          <div>
                            {val.competency}
                            <Box sx={{ width: "100%" }}>
                              <LinearProgressWithLabel value={parseInt(`${val.assigned_weight}0`)} />
                            </Box>
                          </div>
                        </ListItem>
                      );
                    })}
                  </List>
                </ListItem>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCompetancy: () => dispatch(getCompetancy()),
  };
};

const mapStateToProps = (state) => {
  return { competancyData: state.competancy.competancyData };
};

// export default PlayerDevelopment;
export default connect(mapStateToProps, mapDispatchToProps)(PlayerDevelopment);
