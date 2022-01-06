import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./PlayerDevelopment.scss";
import PlayerDevelopmentListItem from "./PlayerDevelopmentListItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { getPersonalDevPageInfo } from "./../../redux/index";
import { connect } from "react-redux";

function PlayerDevelopment(props) {
  console.log(props);
  const [compData, setCompetancyData] = useState([]);
  const [datesArr, setDatesArr] = useState([]);
  const [maxDate, setMaxDate] = useState("");
  const [displayRowArr, setDisplayRow] = useState([]);
  const {
    getPersonalDevPageInfo,
    pdpData: { progressBarData, assessmentDates },
  } = props;
  console.log("---progressBarData--");
  console.log(progressBarData);
  useEffect(() => {
    getPersonalDevPageInfo();
  }, []);

  useEffect(() => {
    if (
      progressBarData &&
      assessmentDates &&
      progressBarData.length != 0 &&
      assessmentDates.length != 0
    ) {
      //     console.log(progressBarData);
      setCompetancyData([...progressBarData]);
      setDatesArr([...assessmentDates]);
      let getMaxDate = new Date(
        Math.max(...assessmentDates.map((e) => new Date(e)))
      );
      getMaxDate = getMaxDate.toISOString();
      setMaxDate(getMaxDate);
      setDisplayRow([getMaxDate]);
    }
  }, [progressBarData]);

  const handleCheckBoxChange = (event, date) => {
    console.log(event.target.value);
    console.log(date);
    if (!displayRowArr.includes(date)) {
      setDisplayRow([...displayRowArr, date]);
    } else {
      const index = displayRowArr.indexOf(date);
      displayRowArr.splice(index, 1);
      setDisplayRow([...displayRowArr]);
    }
  };

  return (
    // <div>"test"</div>
    <div className="PlayerAssessmentPage">
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        player development plans -skill view
      </Typography>
      <div>
        <FormGroup>
          {datesArr.map((date, i) => {
            return date == maxDate ? (
              <FormControlLabel
                control={<Checkbox defaultChecked disabled/>}
                label={date}
                onChange={(ev) => {
                  handleCheckBoxChange(ev, date);
                }}
              />
            ) : (
              <FormControlLabel
                control={<Checkbox />}
                label={date}
                onChange={(ev) => {
                  handleCheckBoxChange(ev, date);
                }}
              />
            );
          })}
        </FormGroup>
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={12}>
          <List className="MainCompetancyList">
            {compData.map((item, index) => {
              return (
                <ListItem
                  className="CompetancyListItem"
                  key={item.competency_bundle}
                >
                  <ListItemText className="CompetancyBundleLabel">
                    {item.competency_bundle}
                  </ListItemText>
                  <List className="SubCompetancyList">
                    {item.competencies.map((val, index) => {
                      return (
                        <PlayerDevelopmentListItem
                          val={val}
                          index={index}
                          maxDate={maxDate}
                          displayRowArr={displayRowArr}
                        ></PlayerDevelopmentListItem>
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
    getPersonalDevPageInfo: () => dispatch(getPersonalDevPageInfo()),
  };
};

const mapStateToProps = (state) => {
  console.log("-------state-------");
  console.log(state);
  return { pdpData: state.personalDevelopment.pdpData };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDevelopment);
