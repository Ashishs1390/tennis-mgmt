import {FETCH_INITIAL_COMPETANCY_SUCESS,FETCH_INITIAL_COMPETANCY_FAILURE} from './competancyActionTypes'
import { get } from '../../api/axios.api';

export const fetchCompetancySuccess =(data) =>{
    return {
      type:FETCH_INITIAL_COMPETANCY_SUCESS,
      payload:data
    }
  }
  
  export const fetchCompetancyFailure =(error) =>{
    return {
      type:FETCH_INITIAL_COMPETANCY_FAILURE,
      payload:error
    }
  }
  
  export const getCompetancy = () =>{
    return async (dispatch) =>{
      console.log("-----------getCompetancy-------------")
      const current_level = localStorage.getItem('current_level');
      let response = await get("/api/tennismgmt/competancy/",{"current_level":current_level});
      console.log("-------response----------")
      console.log(response.data.data);
      if(response.error == false){
          dispatch(fetchCompetancySuccess([...response.data.data]));
      }else{
          dispatch(fetchCompetancyFailure({errMsg:"Error in fetching videos"}));
  
      }
  
    }
  }