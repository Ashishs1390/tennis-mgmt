import * as React from "react";
import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
      minWidth: '36px !important',
      marginRight: '5px !important'
    },
  });

export default function Rating(props) {
    const classes = useStyles();
    const { updateRating, assigned_weight, prev_weight } = props;
    const [currentWeight, setCurrentWeight] = useState(assigned_weight);
    const updateWeight = (i) => {
        setCurrentWeight(i);
        updateRating(i);
    };
    return (
            <div>
                {
                    new Array(10).fill(1).map((x ,i)=> {
                        return (
                            <span>
                                
                            <Button key={i+1} variant={currentWeight === (i+1) ? "contained" : "outlined" } size="small" className={classes.root} onClick={() => {updateWeight(i+1)}}>
                                    {
                                        prev_weight === (i + 1) &&
                                        <span className="prevDot"></span>

                                    }
                                    {i + 1}
                            </Button>
                            </span>
                        )
                    })
                }
            </div>
    )
}