import {
  FETCH_PERSONALDEV_COMP_SUCCESS,
  FETCH_PERSONALDEV_COMP_FAILURE,
  GET_PERSONALDEV_COMP_LOADING,
  GET_PERSONALDEV_COMP_SUCCESS,
  GET_PERSONALDEV_COMP_FAILURE,
} from "./playerDevelopmentActionTypes";

const initalPDPState = {
  pdpData: {},
  pdpError: {},
  loading: false,
};

export const initalPDPReducer = (state = initalPDPState, action) => {
  switch (action.type) {
    case FETCH_PERSONALDEV_COMP_SUCCESS:
      return {
        ...state,
        loading: false,
        pdpData: action.payload,
        pdpError: {},
      };
    case FETCH_PERSONALDEV_COMP_FAILURE:
      return {
        ...state,
        loading: false,
        pdpData: {},
        pdpError: { ...action.payload },
      };
    case GET_PERSONALDEV_COMP_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PERSONALDEV_COMP_SUCCESS:
      return {
        ...state,
        pdpData: action.payload,
        loading: false,
      };
    case GET_PERSONALDEV_COMP_FAILURE:
      return {
        ...state,
        loading: false,
        pdpError: { ...action.payload },
      };
    default:
      return state;
  }
};
