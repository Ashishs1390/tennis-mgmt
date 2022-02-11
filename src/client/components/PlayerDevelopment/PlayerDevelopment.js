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
import FormatBoldIcon from '@mui/icons-material/FormatBold';
// import DatesPopUp from './../../css-components/DatesPopUp/DatesPopUp';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import { getPersonalDevPageInfo, getPersonalDevOnDate } from "./../../redux/index";
import { connect } from "react-redux";

import Loading from "../common/loading/loading";
// import DatesPopUp from "../../css-components/DatesPopUp/DatesPopUp";
import { getDateDDMMYYYY } from '../../util/util';
import PlayerDevelopmentDatesSection from "./PlayerDevelopmentDatesSection";

const rolesArr = ["coach", "parent"];
const rolesOrder = ["player", "parent", "coach"];
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
  const [compData, setCompetancyData] = useState([]);
  const [datesArr, setDatesArr] = useState({});
  const [maxDate, setMaxDate] = useState("");
  const [displayRowArr, setDisplayRow] = useState([]);
  const [selectedRoles, setSelectedRole] = useState(['parent', 'coach']);
  const [hideScores, setHideScore] = useState(true);
  const {
    getPersonalDevPageInfo,
    pdpData: { progressBarData, assessmentDates, assessmentTestDates, loading = false },
  } = props;
  //const [selectedRadios, setSelectedRadios] = useState({player: radioSelectionList.player[0], parent: radioSelectionList.parent[0], coach: radioSelectionList.coach[0]});
  const [selectedRadios, setSelectedRadios] = useState({ player: '', parent: '', coach: '' });
  useEffect(() => {
    const current_level = localStorage.getItem("current_level");
    getPersonalDevPageInfo(current_level);
  }, []);

  const handleRoleChange = (ev, role) => {
    const selectedRoleIndex = selectedRoles.indexOf(role);
    if (selectedRoleIndex >= 0) {
      selectedRoles.splice(selectedRoleIndex, 1);
      setSelectedRole([...selectedRoles]);
    } else {
      setSelectedRole([...selectedRoles, role]);
    }
  };

  const orderByRoles = (data, rolesOrder) => {
    return Object.keys(data).map((item) => {
      var n = rolesOrder.indexOf(item);
      return [n, { [item]: data[item] }]
    }).sort().reduce(function (acc, j) {
      if (acc) {
        acc = { ...acc, ...j[1] }
      }
      return acc;
    }, {});
  }

  const splicedByRoles = (data) => {
    Object.keys(data).map((item) => {
      return data[item];
    }).reduce((acc, i) => {
      return acc;
    }, {});
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
      setCompetancyData([...progressBarData]);
      const data = radioSelectionList([...assessmentTestDates]);
      const orderedData = orderByRoles(data, rolesOrder);
      const splicedData = splicedByRoles(orderedData);
      const getValue = (val) => {
        return val && val.length >= 0 ? val[0] : [];
      }
      if (selectedRadios.player === '') {
        setSelectedRadios({ player: getValue(data?.player), parent: getValue(data?.parent), coach: getValue(data?.coach) })
      }
      setDatesArr(orderedData);
      let getMaxDate = new Date(
        Math.max(...assessmentTestDates.map((e) => new Date(e.assessment_date)))
      );

      getMaxDate = getMaxDate.toISOString();
      setMaxDate(getMaxDate);
      setDisplayRow([getMaxDate]);
    }
  }, [progressBarData]);

  const handleHideScores = (ev) => {
    setHideScore(!hideScores);

  }

  const updateRadioSelections = (value, object) => {
    const selectedDates = { ...selectedRadios, [object]: value };
    props.getPersonalDevOnDate(selectedDates);
    setSelectedRadios(selectedDates);
  }
  return (
    // <div>"test"</div>
    <div className="PlayerAssessmentPage">
      {/* <FormatBoldIcon>C</FormatBoldIcon> */}
      <Loading open={loading} />
      <div className="RolesContainer">
        <FormGroup>
          {rolesArr.map((role, i) => {
            return (
              <>
                <FormControlLabel
                  control={<Checkbox />}
                  key={role}
                  label={role[0].toUpperCase() + role.substring(1)}
                  checked={!!selectedRoles.find(x => x === role)}
                  onChange={(ev) => {
                    handleRoleChange(ev, role);
                  }}
                />
                <span className="alphabet">{`[${role[0].toUpperCase()}]`}</span>
              </>
            );
          })}
        </FormGroup>
      </div>
      <div className = "hideScoreContainer">
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="hide scores" onChange={(ev) => {
            handleHideScores(ev);
          }}/>
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
      <PlayerDevelopmentDatesSection datesArr={datesArr} />
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
                          selectedRoles={selectedRoles}
                          hideScores = {hideScores}
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
