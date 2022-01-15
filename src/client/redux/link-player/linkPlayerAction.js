import {
  SEARCH_PLAYER_EMAIL,
  SEARCH_PLAYER_EMAIL_SUCCESS,
  SEARCH_PLAYER_EMAIL_FAILURE,
  SELECTED_PLAYER_LINK,
  SELECTED_PLAYER_LINK_SUCCESS,
  SELECTED_PLAYER_LINK_FAILURE,
  FETCH_PLAYER_EMAIL_LIST,
  FETCH_PLAYER_EMAIL_LIST_SUCCESS,
  FETCH_PLAYER_EMAIL_LIST_FAILURE,
} from "./linkPlayerActionsTypes";

import { get, post,put } from "../../api/axios.api";

export const searchedEmail = (searchEmail) => {
  return {
    type: SEARCH_PLAYER_EMAIL,
    payload: searchEmail
  };
};

export const searchedEmailSuccess = () => {
  return {
    type: SEARCH_PLAYER_EMAIL_SUCCESS,
  };
};

export const searchedEmailFailure = (payload) => {
  return {
    type: SEARCH_PLAYER_EMAIL_FAILURE,
    payload
  };
};

export const getSearchedPlayerByEmail = (searchEmail) => {
  return (dispatch) => {
    dispatch(searchedEmail(searchEmail));
    get(`/api/tennismgmt/linktoplayer`, { params: { email: searchEmail } })
      .then((response) => {
        dispatch(searchedEmailSuccess(response.data.data));
      })
      .catch((error) => {
        console.log('Error:-', error);
        dispatch(searchedEmailFailure(error.response.data.errMsg + " with email " +searchEmail));
      });
  };
};


export const fetchPlayerList = () => {
  return {
    type: FETCH_PLAYER_EMAIL_LIST,
  };
};

export const fetchPlayerListSuccess = (linkedPlayersList) => {
  return {
    type: FETCH_PLAYER_EMAIL_LIST_SUCCESS,
    payload: linkedPlayersList,
  };
};

export const fetchPlayerListFailure = () => {
  return {
    type: FETCH_PLAYER_EMAIL_LIST_FAILURE,
  };
};

export const fetchLinkedPlayerList = (searchEmail) => {
  return (dispatch) => {
    dispatch(fetchPlayerList(searchEmail));
    get(`/api/tennismgmt/linktoplayer`)
      .then((response) => {
        dispatch(fetchPlayerListSuccess(response.data.data));
      })
      .catch((error) => {
        console.log('Error:-', error);
        dispatch(fetchPlayerListFailure(error.response.errMsg));
      });
  };
};


export const addPlayer = () => {
  return {
    type: SELECTED_PLAYER_LINK,
  };
};

export const addedPlayerSuccess = (payload) => {
  return {
    type: SELECTED_PLAYER_LINK_SUCCESS,
    payload
  };
};

export const addPlayerFailure = () => {
  return {
    type: SELECTED_PLAYER_LINK_FAILURE,
  };
};

export const addPlayerToList = (details) => {
  return (dispatch) => {
    dispatch(addPlayer());
    put(`/api/tennismgmt/linktoplayer`, { ...details })
      .then((response) => {
          dispatch(addedPlayerSuccess(response.data.data[0]));
      })
      .catch((error) => {
        console.log('Error:-', error);
        dispatch(addPlayerFailure(error.response.data.errMsg));
      });
  };
};