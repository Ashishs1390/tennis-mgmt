import * as React from "react";
import { makeStyles } from "@mui/styles";
import Competancy from "./competancy";
import Typography from "@mui/material/Typography";
const useStyles = makeStyles({
  title: {
    fontSize: "20px !important",
  },
});

function BundelCompetancy(props) {
  console.log("---------------BundelCompetancy-------------------")
  const classes = useStyles();
  const { competency_bundle, values, updateBundelCompetancyRating } = props;

  const updateCompetancyRating = (i, weight) => {
    updateBundelCompetancyRating(i, weight)
  };
  return (
    <div>
      <Typography
        sx={{ display: "inline" }}
        component="h4"
        variant="body2"
        color="text.primary"
        className={classes.title}
      >
        {competency_bundle}
      </Typography>
      {values && values.length > 0 ? (
        [...values].map((x, i) => (
        
            <Competancy
              key={x.competency + i}
              questionNo={i + 1}
              {...x}
              y={x}
              updateCompetancyRating={updateCompetancyRating.bind(this, i)}
            />
          
          
        ))
      ) : (
        <p> No data available</p>
      )}
    </div>
  );
}

export default BundelCompetancy;
