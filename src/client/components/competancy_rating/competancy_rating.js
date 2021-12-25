import * as React from "react";
import { useEffect, useState } from "react";
import BundelCompetancy from "./bundel_competancy";
import { getCompetancy, updateCompetancyWeight, saveCompetancy } from "./../../redux/index";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
function CompetancyRating(props) {
  const { getCompetancy, updateCompetancyWeight, saveCompetancy } = props;
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
    competancyData.forEach(x => {
      flag = x.values.filter( y => y.assigned_weight === 0).length <= 0 && flag;
    });
    if (flag) {
      saveCompetancy(competancyData.map(x => {
        return {
          ...x,
          assessment_date: new Date().toISOString()
        }
      }));
      alert('submit');
    } else {
      alert('error');
    }
  }
  return (
    <div>
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
  return { competancyData: state.competancy.competancyData };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetancyRating);
