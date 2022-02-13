import {
    POST_BASICINFO_REQUEST,
    POST_BASICINFO_SUCCESS,
    POST_BASICINFO_FAILURE,

    EMAIL_VALIDATION_REQUEST,
    EMAIL_VALIDATION_SUCCESS,
    EMAIL_VALIDATION_FAILURE,

    FETCH_BASICINFO_REQUEST,
    FETCH_BASICINFO_SUCCESS,
    FETCH_BASICINFO_FAILURE,

    UPDATE_BASI_ONFO_PLAYER
} from "./basicInfoTypes";

const initialState = {
    data:{},  
    error:{status:200},
    registration: null,
}

const initalFetchState = {
    data:[],
    error:{}
}

export const reducer = (state = initialState,action)=>{
    switch(action.type){
        
        case POST_BASICINFO_REQUEST: 
            return {
                ...state
            }

        case POST_BASICINFO_SUCCESS:
            return {
                ...state,
                data: action.payload,
                registration: true,
                error:{}
            }
        case POST_BASICINFO_FAILURE:
            return {
                ...state,
                data:[],
                error:{...action.payload}
            } 
        case UPDATE_BASI_ONFO_PLAYER: {
            return {
                ...state,
                data: {...state.getData.data, player: action.payload},
                error:{}
            }
        }

        default: return state;
    }

}

const initialValidationState = {
    isValid: false,  
    error:{status:200}
    
}
export const validateEmailReducer = (state = initialValidationState,action)=>{
    switch(action.type){
        
        case EMAIL_VALIDATION_REQUEST: 
            return {
                ...state
            }

        case EMAIL_VALIDATION_SUCCESS:
            return {
                ...state,
                data:action.payload,
                error:{}
            }
        case EMAIL_VALIDATION_FAILURE:
            return {
                ...state,
                data:false,
                error:{...action.payload}
            } 
        default: return state;
    }

}

export const initalFetchReducer = (state = initalFetchState,action)=>{
    switch(action.type){
        
        case FETCH_BASICINFO_REQUEST: 
            return {
                ...state
            }

        case FETCH_BASICINFO_SUCCESS:
            return {
                ...state,
                data:action.payload,
                error:{}
            }
        case FETCH_BASICINFO_FAILURE:
            return {
                ...state,
                data:[],
                error:{...action.payload}
            } 
       

        default: return state;
    }

}



// export default {reducer,initalFetchReducer,validateEmailReducer}