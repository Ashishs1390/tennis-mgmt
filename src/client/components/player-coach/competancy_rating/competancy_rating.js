import * as React from "react";
import { useEffect, useState, createContext } from "react";
import BundelCompetancy from "./bundel_competancy";
import {
  getCompetancy,
  updateCompetancyWeight,
  saveCompetancy,
} from "./../../../redux/index";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loading from "../../common/loading/loading";
import TextField from "@mui/material/TextField";
import { getDateYYYYMMDD } from "../../../util/util";
import { useNavigate } from "react-router-dom";

import "./competancy.scss";

export const AssessmentContext = createContext();

function CompetancyRating(props) {
  const { getCompetancy, updateCompetancyWeight, saveCompetancy, loading } =
    props;
  const [competancyData, SetCompetancyData] = useState([]);
  const [competancyDataHandel, SetCompetancyDataHandel] = useState([]);
  const [{ playerName }] = useState({
    playerName: localStorage.getItem("child_email"),
  });
  const [dotPosition, setDotPosition] = useState({x: 0, y: 0});

  const current_level = localStorage.getItem("current_level");
  const navigate = useNavigate();
  const updateBundelCompetancyRating = (i, j, weight) => {
    //updateCompetancyWeight(i, j, weight);
    const data = competancyData;
    data[i].values[j].assigned_weight = weight;
    SetCompetancyData(data);
  };
  useEffect(() => {
    getCompetancy(current_level);
  }, []);
  useEffect(() => {
    if (props.isSaved) {
      navigate("../playerdevelopment");
    } else if (props.isSaved === false) {
      alert("Issue occured while saving competancy.");
    }
  }, [props.isSaved]);
  useEffect(() => {
    if (competancyDataHandel.length <= 0) {
      SetCompetancyDataHandel(props.competancyData);
    }
    SetCompetancyData(props.competancyData);
  }, [props.competancyData]);
  const [assDate, setAssDate] = useState(getDateYYYYMMDD(new Date()));
  const setDate = (selectedDate) => {
    setAssDate(
      getDateYYYYMMDD(selectedDate) +
        "T" +
        new Date().toString().match(/\d{2}:\d{2}:\d{2}/g) +
        ".000Z"
    );
  };
  const onSumbit = () => {
    let flag = true;
    competancyData.forEach((x) => {
      flag =
        x.values.filter((y) => y.assigned_weight === 0).length <= 0 && flag;
    });
    if (flag) {
      saveCompetancy(
        competancyData.map((x) => {
          return {
            ...x,
            assessment_date: assDate.match(/T/g)
              ? assDate
              : new Date().toISOString(),
            // assessment_date: new Date().toISOString(),
          };
        })
      );
    } else {
      alert("error");
    }
  };

  const getDotPosition = (e) => {
    if ([...e.target.classList].indexOf('MuiButton-root') >= 0) {
      const { top, left } = e.target.parentElement.getBoundingClientRect();
      setDotPosition({x: left - 15 ,y: top + window.scrollY + 10});
    }
  };

  return (
    <AssessmentContext.Provider value={{ getDotPosition }}>
      <div id="CompetancyDetails">
        { dotPosition.y > 0 && <div className="dot-indicator" style={{top: dotPosition.y + 'px', left:  dotPosition.x + 'px'}}></div>}
        <Typography
          sx={{ display: "block" }}
          component="h3"
          variant="h3"
          align="center"
          color="text.primary"
        >
          Player Assessment
        </Typography>
        <Box
          sx={{
            p: 2,
          }}
        >
          <div className="player-details">
            <table>
              <tbody>
                <tr>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="right"
                      color="text.primary"
                    >
                      Player:
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      {playerName}
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="right"
                      color="text.primary"
                    >
                      Player description:
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      Male, Play Right, Aggressive Baseline, 5' 4", 115lb
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="right"
                      color="text.primary"
                    >
                      Player Evaluation:
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    ></Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="right"
                      color="text.primary"
                    >
                      Goal Level: {current_level}
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    ></Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="right"
                      color="text.primary"
                    >
                      Timeframe:
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      1 year
                    </Typography>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="right"
                      color="text.primary"
                    >
                      Assessment Date:
                    </Typography>
                  </td>
                  <td>
                    <Typography
                      sx={{ display: "block" }}
                      component="p"
                      variant="h6"
                      align="left"
                      color="text.primary"
                    >
                      <input
                        type="date"
                        defaultValue={assDate}
                        id="AssessmentDate"
                        name="assessmentDate"
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                      ></input>
                    </Typography>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
        <Loading open={loading} />
        {competancyDataHandel && competancyDataHandel.length > 0 ? (
          [...competancyDataHandel].map((x, i) => (
            <BundelCompetancy
              {...x}
              key={x.competency_bundle}
              updateBundelCompetancyRating={updateBundelCompetancyRating.bind(
                this,
                i
              )}
            />
          ))
        ) : (
          <p> Data Loading... </p>
        )}
        <Box
          component="form"
          noValidate
          autoComplete="off"
          className="fieldbox"
        >
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={onSumbit}
          >
            Submit
          </Button>
        </Box>
      </div>
    </AssessmentContext.Provider>
  );
}

// export default CompetancyRating;

const mapDispatchToProps = (dispatch) => {
  return {
    getCompetancy: (current_level) => dispatch(getCompetancy(current_level)),
    updateCompetancyWeight: (bundel, competancy, weight) =>
      dispatch(updateCompetancyWeight({ bundel, competancy, weight })),
    saveCompetancy: (data) => dispatch(saveCompetancy({ data })),
  };
};

const mapStateToProps = (state) => {
  return {
    competancyData: state.competancy.competancyData,
    loading: state.competancy.loading,
    isSaved: state.competancy.isSaved,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetancyRating);

/*
[...document.querySelectorAll('#CompetancyDetails > div')].filter((x, i) => ( i != 0 && x)).forEach(x => {
    const h = [...x.querySelectorAll('.MuiListItemSecondaryAction-root')];
    h.forEach(x => {
    const f = x.querySelectorAll('Button')[Math.floor((Math.random() * 9) +1)];
    console.log(f.click())
})
})
*/
