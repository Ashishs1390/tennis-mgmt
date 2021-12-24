import * as React from "react";
import { makeStyles } from '@mui/styles';
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Rating from "./rating";
const useStyles = makeStyles({
    root: {
    },
  });

export default function Competancy(props) {
    const classes = useStyles();
    const {updateCompetancyRating, questionNo, competency} = props;
    const updateRating = (i) => {
      updateCompetancyRating(i);
    }

    return (
          <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <Rating {...props} updateRating={updateRating}/>
                }
              >
                <ListItemText
                   primary={`Question ${questionNo}:`}
                  secondary={<p style={{ fontStyle: "italic", margin: 0 }}>
                    <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                       {competency} 
                      </Typography>
                       <Typography
                         sx={{ display: "inline" }}
                         component="span"
                         variant="body2"
                         color="text.primary"
                       >
                         , (Rate from 1 to 10 (Not to Rate 5 and 6))
                      </Typography>
                  </p>}/>

                  <Divider variant="inset" component="li" />
                  
          </ListItem>
    )
}