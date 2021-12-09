import * as React from "react";
import { useEffect, useState } from "react"
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { connect } from "react-redux";
import { selectVideoAnalysis } from "../../redux/videoanalysis/videoAnalysisActions";
import VideoPlayerContainer from '../youtube-player/player-container';
function CompareLibrary(props) {
    const [compareVideo, setCompareVideo]  = useState('');
    const [libraryVideo, setLibraryVideo]  = useState('');
  const { selectVideoAnalysis } = props;

    const list = [{
        id: 1,
        label: 'AB - Anghg kjhjkjhk kjhjk',
        src: 'Lp1n5fyazQ8'
    },{
        id: 2,
        label: 'CD - Anghg kjhjkjhk kjhjk',
        src: 'w389Y350c_c'
    },{
        id: 3,
        label: 'EF - Anghg kjhjkjhk kjhjk',
        src: 'Ad0AI1WmiXw'
    },{
        id: 4,
        label: 'GH - Anghg kjhjkjhk kjhjk',
        src: 'r2p5dZMuP1M'
    } ]
    const onChangeHandler = (event) => {
        const url = event.target.value;
        const val = url.match(
            /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
          );
        setCompareVideo(val[1]);
        selectVideoAnalysis([{src: compareVideo}, {src: libraryVideo}]);
    };
    const handleChange = (event) => {
        const val = event.target.value;
        setLibraryVideo(val);
        selectVideoAnalysis([{src: compareVideo}, {src: libraryVideo}]);

    };
  return (
    <>
      <Typography variant="h4" gutterBottom component="div">
        Compare with Library Video
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={10} md={6}>
            <Box sx={{ minWidth: 200 }}>
                <TextField fullWidth id="outlined-basic" label="video" variant="outlined" key="video" name="video" onChange={onChangeHandler} value={compareVideo}/>
            </Box>
          </Grid>
          <Grid item xs={10} md={6}>
            <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                    Select library video
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={libraryVideo}
                  label="Select library video"
                  onChange={handleChange}
                >
                    {
                        list.map(x => (
                            <MenuItem key={x.id} value={x.src}>{x.label}</MenuItem>
                        ))
                    }
                </Select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </Box>
      { compareVideo && libraryVideo && <VideoPlayerContainer showPlayerVideo="true"/> }
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
    return {
      selectVideoAnalysis: (outObj) => dispatch(selectVideoAnalysis(outObj))
    };
  };
  
  const mapStateToProps = (state) => {
    return {videoAnalysis: state.videoAnalysis};
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CompareLibrary);
  