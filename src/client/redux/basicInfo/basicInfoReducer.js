import {
    FETCH_BASICINFO_REQUEST,
    FETCH_BASICINFO_SUCCESS,
    FETCH_BASICINFO_FAILURE,
    EMAIL_VALIDATION_REQUEST,
    EMAIL_VALIDATION_SUCCESS,
    EMAIL_VALIDATION_FAILURE } from "./basicInfoTypes";

const initialState = {
    data:[],  
    error:{status:200}
    
}

const reducer = (state = initialState,action)=>{
    console.log("in reducer")
    console.log(action.payload)
    switch(action.type){
        
        case FETCH_BASICINFO_REQUEST: 
            return {
                ...state
            }

        case FETCH_BASICINFO_SUCCESS:
            return {
                data:action.payload,
                error:{}
            }
        case FETCH_BASICINFO_FAILURE:
            return {
                data:[],
                error:{...action.payload}
            } 
       

        default: return state;
    }

}

const initialValidationState = {
    isValid: false,  
    error:{status:200}
    
}

export const validateEmailReducer = (state = initialValidationState,action)=>{
    console.log(action.payload)
    switch(action.type){
        
        case EMAIL_VALIDATION_REQUEST: 
            return {
                ...state
            }

        case EMAIL_VALIDATION_SUCCESS:
            return {
                data:action.payload,
                error:{}
            }
        case EMAIL_VALIDATION_FAILURE:
            return {
                data:false,
                error:{...action.payload}
            } 
        default: return state;
    }

}

export default reducer