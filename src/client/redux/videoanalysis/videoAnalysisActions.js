import {FETCH_VIDEO_REQUEST,FETCH_VIDEO_SUCCESS,FETCH_VIDEO_FAILURE} from './videoAnalysisActionsTypes';
import {get} from './../../api/axios.api'
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
        let response = await get("api/tennismgmt/videoanalysis/")
        if(response){
            dispatch(fetchVideoSuccess({...response.data.data}));
        }else{
            dispatch(fetchVideoFailure({...response.data.data}));

        }
    }
}