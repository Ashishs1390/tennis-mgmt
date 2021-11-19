import { FETCH_BASICINFO_REQUEST,FETCH_BASICINFO_SUCCESS,FETCH_BASICINFO_FAILURE } from "./basicInfoTypes";

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
export default reducer