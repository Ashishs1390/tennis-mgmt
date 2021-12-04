
import {FETCH_VIDEO_REQUEST,FETCH_VIDEO_SUCCESS,FETCH_VIDEO_FAILURE} from './videoAnalysisActionsTypes';
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

