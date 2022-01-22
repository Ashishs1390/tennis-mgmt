import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate, Link, Outlet } from "react-router-dom";
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
import MenuItem from "@mui/material/MenuItem";

import { getPersonalDevPageInfo } from "./../../redux/index";
import { connect } from "react-redux";
import { sliderClasses } from "@mui/material";
const rolesArr = ["coach", "parent"];
function PlayerDevelopment(props) {
  const navigate = useNavigate();
  console.log(props);
  const [compData, setCompetancyData] = useState([]);
  const [datesArr, setDatesArr] = useState([]);
  const [maxDate, setMaxDate] = useState("");
  const [displayRowArr, setDisplayRow] = useState([]);
  const [selectedRoles, setSelectedRole] = useState([]);
  const {
    getPersonalDevPageInfo,
    pdpData: { progressBarData, assessmentDates, assessmentTestDates },
  } = props;
  console.log("---progressBarData--");
  console.log(progressBarData);

  useEffect(() => {
    const current_level = localStorage.getItem("current_level");
    getPersonalDevPageInfo(current_level);
  }, []);

  const handleRoleChange = (ev, role) => {
    const selectedRoleIndex = selectedRoles.indexOf(role);
    if (selectedRoleIndex >= 0 ) {
      selectedRoles.splice(selectedRoleIndex, 1);
    } else {
      setSelectedRole([...selectedRoles, role]);
    }
 
  }

  const updateNav = (link) => {
    navigate(link);
    setMenuOpen(false);
  };

  useEffect(() => {
    if (
      progressBarData &&
      assessmentTestDates &&
      progressBarData.length != 0 &&
      assessmentTestDates.length != 0
    ) {
      //     console.log(progressBarData);
      setCompetancyData([...progressBarData]);
      setDatesArr([...assessmentTestDates]);
      let getMaxDate = new Date(
        Math.max(...assessmentTestDates.map((e) => new Date(e.assessment_date)))
      );
      console.log("-------------getMaxDate---------------");
      console.log(getMaxDate);
      getMaxDate = getMaxDate.toISOString();
      setMaxDate(getMaxDate);
      setDisplayRow([getMaxDate]);
    }
  }, [progressBarData]);

  const handleCheckBoxChange = (event, date) => {
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
      <div className="RolesContainer">
        <FormGroup>
          {rolesArr.map((role, i) => {
            return (
              <FormControlLabel
                control={<Checkbox />}
                key={ role}
                label={role}
                onChange={(ev) => {
                  handleRoleChange(ev, role);
                }}
              />
            )
          })}
        </FormGroup>
      </div>
      <div className="NewAssessment">
        <MenuItem
          onClick={() => {
            updateNav('../assessments');
          }}
        >
          Assessments
        </MenuItem>
      </div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        player development plans -skill view
      </Typography>
      <div>
        <FormGroup>
          {datesArr.filter(({role},index)=> role == "player" || selectedRoles.indexOf(role)>= 0).map((date, i) => {
            return date.assessment_date == maxDate ? (
              <FormControlLabel
                control={<Checkbox defaultChecked disabled />}
                label={`${date.assessment_date},${date.role}`}
                onChange={(ev) => {
                  handleCheckBoxChange(ev, date.assessment_date);
                }}
              />
            ) : (
              <FormControlLabel
                control={<Checkbox />}
                label={`${date.assessment_date},${date.role}`}
                onChange={(ev) => {
                  handleCheckBoxChange(ev, date.assessment_date);
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
    getPersonalDevPageInfo: (current_level) => dispatch(getPersonalDevPageInfo(current_level)),
  };
};

const mapStateToProps = (state) => {
  return { pdpData: state.personalDevelopment.pdpData };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDevelopment);
