import {FETCH_INITIAL_COMPETANCY_SUCESS,FETCH_INITIAL_COMPETANCY_FAILURE, UPDATE_COMPETANCY_WEIGHT, SAVE_COMPETANCY_SUCESS, SAVE_COMPETANCY_FAILURE} from './competancyActionTypes'


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
        case UPDATE_COMPETANCY_WEIGHT: {
            const competancyData = JSON.parse(JSON.stringify(state.competancyData));
            const data = action.payload;
            competancyData[data.bundel].values[data.competancy].assigned_weight = data.weight;
            return {
                ...state,
                competancyData: [...competancyData],
            }
        }
        case SAVE_COMPETANCY_SUCESS: 
            return {
                ...state,
                competancyData: [],
                competancyError: {}
            } 
        case SAVE_COMPETANCY_FAILURE: 
            return {
                ...state,
                competancyError: {...action.payload}
            }     
        default: return state;
    }

}
