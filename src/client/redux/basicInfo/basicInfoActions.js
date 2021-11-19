import axios from "axios";

import { FETCH_BASICINFO_REQUEST,FETCH_BASICINFO_SUCCESS,FETCH_BASICINFO_FAILURE } from "./basicInfoTypes";

export const fetchDetailsRequest = () => {
  return {
    type: FETCH_BASICINFO_REQUEST,
  };
};


export const fetchDetailsSuccess = (data) =>{
    return {
        type:FETCH_BASICINFO_SUCCESS,
        payload: data
    }
}

const fetchUsersFailure = (error) =>{
  console.log(error)
  return {
      type:FETCH_BASICINFO_FAILURE,
      payload:error
  }
}

export const fetchDetails = (fields) => {
  console.log(fields)
  return (dispatch) => {
    dispatch(fetchDetailsRequest);
    axios
      .post(`/api/tennismgmt/registration/${fields.role}`,{...fields})
      .then( (response)=> {
        console.log("sucess")
        // handle success
        dispatch(fetchDetailsSuccess([...response.data.a]));

      })
      .catch( (error) =>{
        console.log("-------error--------")
        console.log(error);
        console.log(error.response.data)

        dispatch(fetchUsersFailure(error.response.data));

        // handle error
      });
  };
};
