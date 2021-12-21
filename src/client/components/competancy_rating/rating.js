import * as React from "react";
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
    return (
        <>
            <div>
                <Button variant="outlined" size="small" className={classes.root}>
                    1
                </Button>
                <Button variant="outlined" size="small" className={classes.root}>
                    2
                </Button>
                <Button variant="outlined" size="small" className={classes.root}>
                    3
                </Button>
                <Button variant="outlined" size="small" className={classes.root}>
                    4
                </Button>
                <Button variant="outlined" size="small" className={classes.root}>
                    5
                </Button>
                <Button variant="outlined" size="small" className={classes.root}>
                    6
                </Button>
                <Button variant="outlined" size="small" className={classes.root}>
                    7
                </Button>
                <Button variant="contained" size="small" className={classes.root}>
                    8
                </Button>
                <Button variant="outlined" size="small" className={classes.root}>
                    9
                </Button>
                <Button variant="outlined" size="small" className={classes.root}>
                    10
                </Button>
            </div>
        </>
    )
}