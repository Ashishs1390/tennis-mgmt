import React, { useEffect, useState } from "react";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

import { useNavigate, Link, Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";
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

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import { getPersonalDevPageInfo, getPersonalDevOnDate } from "./../../redux/index";
import { connect } from "react-redux";

import Loading from "../common/loading/loading";

const rolesArr = ["coach", "parent"];

const dummy = [
  { assessment_date: "2022-01-25T17:10:41.719Z", role: "player" },
  { assessment_date: "2022-01-25T17:07:51.897Z", role: "parent" },
  { assessment_date: "2022-01-04T17:01:59.726Z", role: "coach" },
  { assessment_date: "2022-01-20T17:10:41.719Z", role: "player" },
  { assessment_date: "2022-01-20T17:07:51.897Z", role: "parent" },
  { assessment_date: "2022-01-05T17:01:59.726Z", role: "coach" },
  { assessment_date: "2022-01-21T17:10:41.719Z", role: "player" },
  { assessment_date: "2022-01-21T17:07:51.897Z", role: "parent" },
  { assessment_date: "2022-01-06T17:01:59.726Z", role: "coach" },
];

const radioSelectionList = (data) => data.reduce(
  (a, c) => c.role ?
    (a[c.role]
      ? { ...a, [c.role]: [...a[c.role], c.assessment_date] }
      : { ...a, [c.role]: [c.assessment_date] }) : a,
  {}
);
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function PlayerDevelopment(props) {
  const navigate = useNavigate();
  console.log(props);
  const [compData, setCompetancyData] = useState([]);
  const [datesArr, setDatesArr] = useState({});
  const [maxDate, setMaxDate] = useState("");
  const [displayRowArr, setDisplayRow] = useState([]);
  const [selectedRoles, setSelectedRole] = useState([]);
  const {
    getPersonalDevPageInfo,
    pdpData: { progressBarData, assessmentDates, assessmentTestDates, loading },
  } = props;
  //const [selectedRadios, setSelectedRadios] = useState({player: radioSelectionList.player[0], parent: radioSelectionList.parent[0], coach: radioSelectionList.coach[0]});
  const [selectedRadios, setSelectedRadios] = useState({player: '', parent: '', coach: ''});
  
  console.log("---progressBarData--");
  console.log(progressBarData);

  useEffect(() => {
    const current_level = localStorage.getItem("current_level");
    getPersonalDevPageInfo(current_level);
  }, []);

  const handleRoleChange = (ev, role) => {
    const selectedRoleIndex = selectedRoles.indexOf(role);
    if (selectedRoleIndex >= 0) {
      selectedRoles.splice(selectedRoleIndex, 1);
    } else {
      setSelectedRole([...selectedRoles, role]);
    }
  };

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
      const data = radioSelectionList([...assessmentTestDates]);
      // const data = radioSelectionList([...dummy]);

      const getValue = (val) => {
        return val && val.length >= 0 ? val[0] : [];
      }
      setSelectedRadios({player: getValue(data?.player), parent: getValue(data?.parent), coach: getValue(data?.coach)})
      setDatesArr(data);
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
  
  const updateRadioSelections = (value, object) => {
    const selectedDates = {...selectedRadios, [object]: value};
    props.getPersonalDevOnDate(selectedDates);
    setSelectedRadios(selectedDates);
  }

  return (
    // <div>"test"</div>
    <div className="PlayerAssessmentPage">
      <Loading open={loading} />
      <div className="RolesContainer">
        <FormGroup>
          {rolesArr.map((role, i) => {
            return (
              <FormControlLabel
                control={<Checkbox />}
                key={role}
                label={role}
                onChange={(ev) => {
                  handleRoleChange(ev, role);
                }}
              />
            );
          })}
        </FormGroup>
      </div>
      <div className="NewAssessment">
        <MenuItem
          onClick={() => {
            updateNav("../assessments");
          }}
        >
          Assessments
        </MenuItem>
      </div>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        player development plans -skill view
      </Typography>
      <div>
        {/* <FormGroup>
          {datesArr
            .filter(({ role }, index) => !!role)
            .map((date, i) => {
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
        </FormGroup> */}
        <Grid container spacing={2}>
          { Object.keys(datesArr).map((x) => {
            return (
              <Grid key={x} item xs={12} md={3}>
                <Item>
                  <Typography
                    variant="h6"
                    component="div"
                  >
                    {x[0].toUpperCase() + x.slice(1)}
                  </Typography>
                  <RadioGroup
                    aria-label={`${x}`}
                    defaultValue="0"
                    name="radio-buttons-group"
                  >
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      {[...datesArr[x]].map((value, i) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                          <ListItem key={value} disablePadding>
                            <ListItemButton
                              role={undefined}
                              onClick={(value) => {}}
                              dense
                            >
                              <ListItemIcon>
                                <FormControlLabel
                                  value={value}
                                  onChange={() => {updateRadioSelections(value, x)}}
                                  inputprops={{ "aria-labelledby": labelId }}
                                  control={<Radio />}
                                  checked={selectedRadios[x] === value}
                                  label={`${value}`}
                                />
                              </ListItemIcon>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </RadioGroup>
                </Item>
              </Grid>
            );
          })}
        </Grid>
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
    getPersonalDevPageInfo: (current_level) =>
      dispatch(getPersonalDevPageInfo(current_level)),
    getPersonalDevOnDate: (data) => dispatch(getPersonalDevOnDate(data)),
  };
};

const mapStateToProps = (state) => {
  return { pdpData: state.personalDevelopment.pdpData };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDevelopment);
