import {
    FETCH_VIDEO_ANALYSIS_REQUEST,
    FETCH_VIDEO_ANALYSIS_SUCCESS,
    FETCH_VIDEO_ANALYSIS_FAILURE,
    SELECT_VIDEO_FOR_ANALYSIS,
  } from "./videoAnalysisActionsTypes";
  

const initalVideoAnalysisState = {
    data:[],
    loading: false,
    error:{},
    selectedVideos: [],
    email: ''
}

export const reducer = (state = initalVideoAnalysisState, action)=>{
    console.log("in reducer")
    switch(action.type){
        
        case FETCH_VIDEO_ANALYSIS_REQUEST: 
            return {
                ...state,
                loading: true
            }

        case FETCH_VIDEO_ANALYSIS_SUCCESS:
            console.log('--->', action.payload);
            return {
                ...state,
                data: action.payload.frames,
                email: action.payload.email,
                error:{},
                loading: false
            }
        case FETCH_VIDEO_ANALYSIS_FAILURE:
            return {
                ...state,
                data:[],
                error:{...action.payload},
                loading: false
            } 
        case SELECT_VIDEO_FOR_ANALYSIS: 
            return {
                ...state,
                selectedVideos: action.payload
            }

        default: return state;
    }

}
