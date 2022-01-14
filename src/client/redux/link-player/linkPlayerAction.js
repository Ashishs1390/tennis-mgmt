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

import { get, post } from "../../api/axios.api";

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

export const searchedEmailFailure = () => {
  return {
    type: SEARCH_PLAYER_EMAIL_FAILURE,
  };
};

export const getSearchedPlayerByEmail = (searchEmail) => {
  return (dispatch) => {
    dispatch(searchedEmail(searchEmail));
    get(`/api/tennismgmt/linkplayer`,{params: {email: searchEmail}})
      .then((response) => {
        setTimeout(() => {
          dispatch(searchedEmailSuccess());
        }, 1000)
      })
      .catch((error) => {
        console.log('Error:-', error);
        dispatch(searchedEmailFailure(error.response.data));
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
    get(`/api/tennismgmt/linkplayer`)
      .then((response) => {
        setTimeout(() => {
          dispatch(fetchPlayerListSuccess([
            'poo.baa@gmail.com', 'goo.uaa@gmail.com', 'voo.haa@gmail.com', 'koo.jaa@gmail.com'
        ]));
        }, 1000)
      })
      .catch((error) => {
        console.log('Error:-', error);
        dispatch(fetchPlayerListFailure(error.response.data));
      });
  };
};


export const addPlayer = () => {
  return {
    type: SELECTED_PLAYER_LINK,
  };
};

export const addedPlayerSuccess = () => {
  return {
    type: SELECTED_PLAYER_LINK_SUCCESS,
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
    post(`/api/tennismgmt/linkplayer`,{...details})
      .then((response) => {
        setTimeout(() => {
          dispatch(addedPlayerSuccess());
        }, 1000)
      })
      .catch((error) => {
        console.log('Error:-', error);
        dispatch(addPlayerFailure(error.response.data));
      });
  };
};