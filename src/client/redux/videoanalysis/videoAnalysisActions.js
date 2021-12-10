import {
  FETCH_VIDEO_ANALYSIS_REQUEST,
  FETCH_VIDEO_ANALYSIS_SUCCESS,
  FETCH_VIDEO_ANALYSIS_FAILURE,
  SELECT_VIDEO_FOR_ANALYSIS,

  FETCH_VIDEO_COMPARE_SUCESS,
  FETCH_VIDEO_COMPARE_FAILURE
} from "./videoAnalysisActionsTypes";

import { get } from '../../api/axios.api';
import {FETCH_VIDEO_REQUEST,FETCH_VIDEO_SUCCESS,FETCH_VIDEO_FAILURE} from './videoAnalysisActionsTypes';

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
    return async (dispatch) =>{
        let response = await get("/api/tennismgmt/videoanalysis/");
        if(response.error == false){
            dispatch(fetchVideoSuccess({...response.data.data}));
        }else{
            dispatch(fetchVideoFailure({errMsg:"Please upload the videos"}));

        }
    }
}

export const fetchCompareVideoSuc =(data) =>{
  return {
    type:FETCH_VIDEO_COMPARE_SUCESS,
    payload:data
  }
}

export const fetchCompareVideoFail =(error) =>{
  return {
    type:FETCH_VIDEO_COMPARE_FAILURE,
    payload:error
  }
}

export const getCompareVideo = () =>{
  return async (dispatch) =>{
    console.log("-----------getCompareVideo-------------")
    let response = await get("/api/tennismgmt/videolibrary/");
    console.log("-------response----------")
    console.log(response.data.data);
    if(response.error == false){
        dispatch(fetchCompareVideoSuc([...response.data.data]));
    }else{
        dispatch(fetchCompareVideoFail({errMsg:"Error in fetching videos"}));

    }

  }
}