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