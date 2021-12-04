import * as React from "react";
import { useEffect } from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { connect } from "react-redux";
import { getVideosForAnalysis, selectVideoAnalysis } from "../../redux/videoanalysis/videoAnalysisActions";


function AlignItemsList(props) {
  // const [checked, setChecked] = React.useState([1]);
  const [age, setAge] = React.useState("");
  const { getVideosForAnalysis, selectVideoAnalysis, videoAnalysis = {email: '', frames: []}} = props;

  useEffect(()=>{
    getVideosForAnalysis()
}, []);



  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleToggle = (value) => () => {
    console.log(props);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    // setChecked(newChecked);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Stroke (Video) Analysis List
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={10} md={4}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Select Player Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Select Player Name"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Kobara Obove</MenuItem>
                  <MenuItem value={20}>Twenty Noun</MenuItem>
                  <MenuItem value={30}>Rand Koltan</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={10} md={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Select Player Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Select Player Name"
                onChange={handleChange}
              >
                <MenuItem value={10}>Kobara Obove</MenuItem>
                <MenuItem value={20}>Twenty Noun</MenuItem>
                <MenuItem value={30}>Rand Koltan</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={10} md={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                All listings
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="All listings"
                onChange={handleChange}
              >
                <MenuItem value={10}>Kobara Obove</MenuItem>
                <MenuItem value={20}>Twenty Noun</MenuItem>
                <MenuItem value={30}>Rand Koltan</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={10} md={2}>
            <Button variant="contained" onClick={() => { console.log(props)}}>Filter</Button>
          </Grid>
        </Grid>
      </Box>
      <Stack spacing={2}>
        <Pagination
          count={10}
          variant="outlined"
          color="primary"
          showFirstButton
          showLastButton
        />
      </Stack>
      <List sx={{ width: "100%", maxWidth: 1080, bgcolor: "background.paper" }}>
      {videoAnalysis.data && videoAnalysis.data.length > 0 && videoAnalysis.data.map((value, i) => {
          const labelId = `checkbox-list-secondary-label-${i}`;
          return (
            <React.Fragment key={i}>
               <ListItem
                alignItems="flex-start"
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={handleToggle(i)}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                }
              >
                <ListItemAvatar>
                   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                   primary="Brunch this weekend?"
                  secondary={<p style={{ fontStyle: "italic", margin: 0 }}>
                    <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        Sasha Frijanic (MOT2010)'s T-Log, by
                      </Typography>
                      <Link href="#">
                         {" Sasha Frijanic (MOT2010)'s T-Log"}
                       </Link>
                       <Typography
                         sx={{ display: "inline" }}
                         component="span"
                         variant="body2"
                         color="text.primary"
                       >
                         , posted on: {value.date}
                      </Typography>
                  </p>}/>

                  <Divider variant="inset" component="li" />
                  
              </ListItem>
            </React.Fragment>
          )
        })}
      </List>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
      getVideosForAnalysis: () => dispatch(getVideosForAnalysis()),
    selectVideoAnalysis: (outObj) => dispatch(selectVideoAnalysis(outObj))
  };
};

const mapStateToProps = (state) => {
  return {videoAnalysis: state.videoAnalysis};
};

export default connect(mapStateToProps, mapDispatchToProps)(AlignItemsList);
