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
import {getCompareVideo} from "./../../redux/index"
import VideoPlayerContainer from '../youtube-player/player-container';
function CompareLibrary(props) {
    const [compareVideo, setCompareVideo]  = useState('');
    const [libraryVideo, setLibraryVideo]  = useState('');
    const [videolist,setVideoList] = useState([])
  const { selectVideoAnalysis,getCompareVideo,videoCompare:{videoCompare} } = props;
   
    useEffect(()=>{
      getCompareVideo()
    },[getCompareVideo]);

    useEffect(()=>{
      if(videoCompare !== undefined){
        setVideoList([...videoCompare])
      }
    },[videoCompare])
    
    const getIdFromUrl =(url,id)=>{
      var videoid = url.match(
        /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
      );
      if (videoid != null) {
        return videoid[1]
      } else {
        console.log("The youtube url is not valid.");
      }
  }
    const onChangeHandler = (event) => {
        const url = event.target.value;
        const val = url.match(
            /(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/
          );
        setCompareVideo(val[1]);
        selectVideoAnalysis([{src: val[1]}, {src: libraryVideo}]);
    };
    const handleChange = (event) => {
      console.log("------------event----------------")
        const val = event.target.value;
        console.log(val);
        setLibraryVideo(val);
        selectVideoAnalysis([{src: compareVideo}, {src: val}]);

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
                        videolist.map(x => (
                            <MenuItem key={x.id} value={getIdFromUrl(x.src)}>{x.title}</MenuItem>
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
      selectVideoAnalysis: (outObj) => dispatch(selectVideoAnalysis(outObj)),
      getCompareVideo:() =>dispatch(getCompareVideo())
    };
  };
  
  const mapStateToProps = (state) => {
    console.log(state);
    const {videoCompare} = state;

    return {videoAnalysis: state.videoAnalysis,
            videoCompare
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(CompareLibrary);
  