import * as React from "react";
import { useEffect, useState } from "react";
import BundelCompetancy from "./bundel_competancy";
import { getCompetancy, updateCompetancyWeight } from "./../../redux/index";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
function CompetancyRating(props) {
  const { getCompetancy, updateCompetancyWeight } = props;
  const [competancyData, SetCompetancyData] = useState([]);
  const updateBundelCompetancyRating = (i, j, weight) => {
    updateCompetancyWeight(i, j, weight);
  };
  useEffect(() => {
    getCompetancy();
  }, []);
  useEffect(() => {
    SetCompetancyData(props.competancyData);
  }, [props.competancyData]);
  const onSumbit = () => {
    let flag = true;
    competancyData.forEach(x => {
      flag = x.values.filter( y => x.assigned_weight === 0).length <= 0 && flag;
    });
    if (flag) {
      alert('submit');
    } else {
      alert('error');
    }
  }
  return (
    <div>
      {competancyData && competancyData.length > 0 ? (
        [...competancyData].map((x, i) => (
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
  };
};

const mapStateToProps = (state) => {
  return { competancyData: state.competancy.competancyData };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompetancyRating);
