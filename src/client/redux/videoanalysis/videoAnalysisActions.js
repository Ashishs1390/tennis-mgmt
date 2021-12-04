import {
  FETCH_VIDEO_ANALYSIS_REQUEST,
  FETCH_VIDEO_ANALYSIS_SUCCESS,
  FETCH_VIDEO_ANALYSIS_FAILURE,
  SELECT_VIDEO_FOR_ANALYSIS,
} from "./videoAnalysisActionsTypes";

import { get } from '../../api/axios.api';

export const getVideoAnalysisRequest = () => {
  return {
    type: FETCH_VIDEO_ANALYSIS_REQUEST,
  };
};

export const getVideoAnalysisSuccess = (data) => {
  return {
    type: FETCH_VIDEO_ANALYSIS_SUCCESS,
    payload: data,
  };
};

export const getVideoAnalysisFailure = (error) => {
  console.log(error);
  return {
    type: FETCH_VIDEO_ANALYSIS_FAILURE,
    payload: error,
  };
};

export const selectVideoAnalysis = (data) => {
    console.log(data);
    return {
      type: SELECT_VIDEO_FOR_ANALYSIS,
      payload: data,
    };
  };

  export const getVideosForAnalysis = () => {
    return (dispatch) => {
      dispatch(getVideoAnalysisRequest());
      get(`/api/tennismgmt/videoanalysis/history`)
        .then( (response)=> {
          console.log("sucess")
          // handle success
          dispatch(getVideoAnalysisSuccess(response.data.data));
  
        })
        .catch( (error) =>{
          console.log("-------error--------")
          console.log(error);
          console.log(error.response.data)
  
          dispatch(getVideoAnalysisFailure(error.response.data));
  
          // handle error
        });
    };
  };
import {FETCH_VIDEO_REQUEST,FETCH_VIDEO_SUCCESS,FETCH_VIDEO_FAILURE} from './videoAnalysisActionsTypes';

export const fetchVideoDetails = () =>{
    return {
        type: FETCH_VIDEO_REQUEST
    }
}

export const fetchVideoSuccess = (data) =>{
    return {
        type:FETCH_VIDEO_SUCCESS,
        payload:data
    }
}

export const fetchVideoFailure = (error) =>{
    return {
        type: FETCH_VIDEO_FAILURE,
        payload: error
    }
}


export const fetchVideo = () =>{
    console.log("in fetch function");   
    return (dispatch) =>{

    }
}
