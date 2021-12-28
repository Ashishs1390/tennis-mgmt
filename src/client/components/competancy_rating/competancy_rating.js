import * as React from "react";
import { useEffect, useState } from "react";
import BundelCompetancy from "./bundel_competancy";
import {
  getCompetancy,
  updateCompetancyWeight,
  saveCompetancy,
} from "./../../redux/index";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Loading from "./../loading/loading";
import './competancy.scss';

function CompetancyRating(props) {
  const { getCompetancy, updateCompetancyWeight, saveCompetancy, loading } =
    props;
  const [competancyData, SetCompetancyData] = useState([]);
  const [competancyDataHandel, SetCompetancyDataHandel] = useState([]);
  const updateBundelCompetancyRating = (i, j, weight) => {
    //updateCompetancyWeight(i, j, weight);
    const data = competancyData;
    data[i].values[j].assigned_weight = weight;
    SetCompetancyData(data);
  };
  useEffect(() => {
    getCompetancy();
  }, []);
  useEffect(() => {
    if (competancyDataHandel.length <= 0) {
      SetCompetancyDataHandel(props.competancyData);
    }
    SetCompetancyData(props.competancyData);
  }, [props.competancyData]);
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
            assessment_date: new Date().toISOString(),
          };
        })
      );
    } else {
      alert("error");
    }
  };
  return (
    <div id="CompetancyDetails">
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
                    Tim Jummy
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
                    Goal Level:
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
      <Box component="form" noValidate autoComplete="off" className="fieldbox">
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
  );
}

// export default CompetancyRating;

const mapDispatchToProps = (dispatch) => {
  return {
    getCompetancy: () => dispatch(getCompetancy()),
    updateCompetancyWeight: (bundel, competancy, weight) =>
      dispatch(updateCompetancyWeight({ bundel, competancy, weight })),
    saveCompetancy: (data) => dispatch(saveCompetancy({ data })),
  };
};

const mapStateToProps = (state) => {
  return {
    competancyData: state.competancy.competancyData,
    loading: state.competancy.loading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetancyRating);

/*
[...document.querySelectorAll('#CompetancyDetails > div')].filter((x, i) => ( i != 0 && x)).forEach(x => {
    const h = [...x.querySelectorAll('.MuiListItemSecondaryAction-root')];
    h.forEach(x => {
    const f = x.querySelector('Button');
    console.log(f.click())
})
})
*/