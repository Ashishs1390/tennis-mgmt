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
  
const initalVideoAnalysisState = {
    searchedPlayer: '',
    loadingSearchedPlayer: false,
    errorSearh: false,
    loadingAddPlayer: false,
    errorAddPlayer: false,
    searchedPlayerList: [],
    loadingSearchedPlayerList: false,
    errorSearhList: false,
}

export const linkPlayerReducer = (state = initalVideoAnalysisState, action)=>{
    switch(action.type){
        case SEARCH_PLAYER_EMAIL: 
            return {
                ...state,
                searchedPlayer: action.payload,
                loadingSearchedPlayer: true
            };
        case SEARCH_PLAYER_EMAIL_SUCCESS: 
            return {
                ...state,
                loadingSearchedPlayer: false,
                errorSearh: null
            };
        case SEARCH_PLAYER_EMAIL_FAILURE: 
            return {
                ...state,
                loadingSearchedPlayer: false,
                errorSearh: action.payload
            };
        case SELECTED_PLAYER_LINK: 
            return {
                ...state,
                loadingAddPlayer: true
            };
        case SELECTED_PLAYER_LINK_SUCCESS: 
            return {
                ...state,
                loadingAddPlayer: false,
                searchedPlayer: '',
                errorAddPlayer: null,
                searchedPlayerList: [...state.searchedPlayerList,action.payload]
            };
        case SELECTED_PLAYER_LINK_FAILURE: 
            return {
                ...state,
                loadingAddPlayer: false,
                errorAddPlayer: action.payload
            };
        case FETCH_PLAYER_EMAIL_LIST: 
            return {
                ...state,
                loadingSearchedPlayerList: true
            };
        case FETCH_PLAYER_EMAIL_LIST_SUCCESS: 
            return {
                ...state,
                searchedPlayerList: action.payload,
                loadingSearchedPlayerList: false,
                errorSearhList: null
            };
        case FETCH_PLAYER_EMAIL_LIST_FAILURE: 
            return {
                ...state,
                loadingSearchedPlayerList: false,
                errorSearhList: action.payload
            };

        default: return state;
    }

}


