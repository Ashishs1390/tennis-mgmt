import axios from "axios";

import {FETCH_LOGIN_REQUEST,FETCH_LOGIN_SUCCESS,FETCH_LOGIN_FAILURE} from './loginActionTypes';


export const fetchLoginRequest = () => {
    return {
      type: FETCH_LOGIN_REQUEST,
    };
  };
  
  
  export const fetchLoginSuccess = (data) =>{
      return {
          type:FETCH_LOGIN_SUCCESS,
          payload: data
      }
  }
  
  const fetchLoginFailure = (error) =>{
    console.log(error)
    return {
        type:FETCH_LOGIN_FAILURE,
        payload:error
    }
  }
  //change login api to support role
  export const fetchLoginDetails = (fields) => {
    console.log(fields)
    return (dispatch) => {
      dispatch(fetchLoginRequest);

      axios
        .post(`/api/tennismgmt/login/${fields.role}`,{...fields})
        .then( (response)=> {
          console.log("sucess")
          console.log(response);
          // handle success
          dispatch(fetchLoginSuccess([response.data]));
  
        })
        .catch( (error) =>{
          console.log("-------error--------")
          console.log(error);
          console.log(error.response.data)
  
          dispatch(fetchLoginFailure(error.response.data));
  
          // handle error
        });
    };
  };