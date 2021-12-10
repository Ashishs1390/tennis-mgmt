import {
    FETCH_VIDEO_ANALYSIS_REQUEST,
    FETCH_VIDEO_ANALYSIS_SUCCESS,
    FETCH_VIDEO_ANALYSIS_FAILURE,
    SELECT_VIDEO_FOR_ANALYSIS,

    FETCH_VIDEO_COMPARE_SUCESS,
    FETCH_VIDEO_COMPARE_FAILURE

  } from "./videoAnalysisActionsTypes";
  
import {FETCH_VIDEO_REQUEST,FETCH_VIDEO_SUCCESS,FETCH_VIDEO_FAILURE} from './videoAnalysisActionsTypes';


const initalVideoAnalysisState = {
    data:[],
    loading: false,
    error:{},
    selectedVideos: [],
    email: ''
}

export const reducer = (state = initalVideoAnalysisState, action)=>{
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

const initalVideoState = {
    videoData:[],
    error:{}
}


export const initalVideoReducer = (state = initalVideoState,action)=>{
    switch(action.type){
        
        case FETCH_VIDEO_REQUEST: 
            return {
                ...state
            }

        case FETCH_VIDEO_SUCCESS:
            return {
                videoData:action.payload,
                error:{}
            }
        case FETCH_VIDEO_FAILURE:
            return {
                videoData:[],
                error:{...action.payload}
            } 
       

        default: return state;
    }

}



const initalCompareState = {
    videoData:[],
    error:{}
}


export const initalCompareReducer = (state = initalCompareState,action)=>{
    switch(action.type){
        

        case FETCH_VIDEO_COMPARE_SUCESS:
            return {
                videoCompare:action.payload,
                error:{}
            }
        case FETCH_VIDEO_COMPARE_FAILURE:
            return {
                videoData:[],
                error:{...action.payload}
            } 
       

        default: return state;
    }

}

