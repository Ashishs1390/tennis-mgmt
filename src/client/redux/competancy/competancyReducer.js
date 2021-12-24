import {FETCH_INITIAL_COMPETANCY_SUCESS,FETCH_INITIAL_COMPETANCY_FAILURE} from './competancyActionTypes'


const initalCompetnacyState = {
    competancyData:[],
    competancyError:{}
}


export const initalCompetnacyReducer = (state = initalCompetnacyState,action)=>{
    switch(action.type){
        

        case FETCH_INITIAL_COMPETANCY_SUCESS:
            return {
                ...state,
                competancyData:action.payload,
                competancyError:{}
            }
        case FETCH_INITIAL_COMPETANCY_FAILURE:
            return {
                ...state,
                competancyData:[],
                competancyError:{...action.payload}
            } 
       

        default: return state;
    }

}
