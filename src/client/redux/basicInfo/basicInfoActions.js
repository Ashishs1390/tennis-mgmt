import axios from "axios";
import {get} from "./../../api/axios.api"

import { POST_BASICINFO_REQUEST,
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

export const postDetailsRequest = () => {
  return {
    type: POST_BASICINFO_REQUEST,
  };
};


export const postDetailsSuccess = (data) =>{
    return {
        type:POST_BASICINFO_SUCCESS,
        payload: data
    }
}

const postUsersFailure = (error) =>{
  return {
      type:POST_BASICINFO_FAILURE,
      payload:error
  }
}

export const updateConnectedChildren = (playerEmail) =>{
  return {
      type:UPDATE_BASI_ONFO_PLAYER,
      payload: playerEmail,
  }
}

export const postDetails = (fields) => {
  return (dispatch) => {
    dispatch(postDetailsRequest);
    axios
      .post(`/api/tennismgmt/registration/${fields.role}`,{...fields})
      .then( (response)=> {
        console.log("sucess")
        // handle success
        debugger;
        dispatch(postDetailsSuccess([...response.data]));

      })
      .catch( (error) =>{
        console.log("-------error--------")
        console.log(error);
        console.log(error.response.data)

        dispatch(postUsersFailure(error.response.data));

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
  return {
      type:EMAIL_VALIDATION_FAILURE,
      payload:error
  }
}

export const emailValidation = (fields) => {
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
  return {
      type:FETCH_BASICINFO_FAILURE,
      payload:error
  }
}

export const fetchDetails = (email) => {
  const reqObj = {  };
  if (email) {
    reqObj["email"] = email;
  }
  return (dispatch) => {
    get(`/api/tennismgmt/registration/authed/`, { params: { ...reqObj }})
      .then( (response)=> {
        dispatch(fetchDetailsSuccess({...response.data.data}));

      })
      .catch( (error) =>{
        console.log(error.response.data)
        dispatch(fetchUsersFailure(error.response.data));
      });
  };
};


