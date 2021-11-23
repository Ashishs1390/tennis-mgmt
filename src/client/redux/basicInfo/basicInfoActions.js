import axios from "axios";

import { FETCH_BASICINFO_REQUEST,
  FETCH_BASICINFO_SUCCESS,
  FETCH_BASICINFO_FAILURE,
  EMAIL_VALIDATION_REQUEST,
  EMAIL_VALIDATION_SUCCESS,
  EMAIL_VALIDATION_FAILURE } from "./basicInfoTypes";

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

export const emailValidationRequest = () => {
  return {
    type: EMAIL_VALIDATION_REQUEST,
  };
};


export const emailValidationSuccess = (data) =>{
    return {
        type:EMAIL_VALIDATION_SUCCESS,
        payload: data
    }
}

const emailValidationFailure = (error) =>{
  console.log(error)
  return {
      type:EMAIL_VALIDATION_FAILURE,
      payload:error
  }
}

export const emailValidation = (fields) => {
  console.log(fields)
  return (dispatch) => {
    dispatch(emailValidationRequest);
    axios
      .get(`/api/tennismgmt/registration/emailvalidation?email=${fields.email}`)
      .then( (response)=> {
        console.log("sucess")
        // handle success
        dispatch(emailValidationSuccess(response.data.isUnique));

      })
      .catch( (error) =>{
        console.log("-------error--------")
        console.log(error);
        console.log(error.response.data)

        dispatch(emailValidationFailure(error.response.data));

        // handle error
      });
  };
};