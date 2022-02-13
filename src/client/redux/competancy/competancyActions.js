import {
  FETCH_INITIAL_COMPETANCY_SUCESS,
  FETCH_INITIAL_COMPETANCY_FAILURE,
  UPDATE_COMPETANCY_WEIGHT,
  SAVE_COMPETANCY_SUCESS,
  SAVE_COMPETANCY_FAILURE,
  LOADING_COMPETANCY,
  SAVE_COMPETANCY_EMPTY
  // FETCH_PERSONALDEV_COMP_SUCCESS,
  // FETCH_PERSONALDEV_COMP_FAILURE,
} from "./competancyActionTypes";
import { get, post } from "../../api/axios.api";
// const current_level = localStorage.getItem("current_level");
export const fetchCompetancySuccess = (data) => {
  return {
    type: FETCH_INITIAL_COMPETANCY_SUCESS,
    payload: data,
  };
};

export const updateCompetancyWeight = (data) => {
  return {
    type: UPDATE_COMPETANCY_WEIGHT,
    payload: data,
  };
};

export const fetchCompetancyFailure = (error) => {
  return {
    type: FETCH_INITIAL_COMPETANCY_FAILURE,
    payload: error,
  };
};

export const getCompetancy = (current_level) => {
  return async (dispatch) => {
    dispatch(loadingCompetancy());
    let response = await get("/api/tennismgmt/competancy/", {
      params: { current_level: current_level },
    });
    if (response.error == false) {
      dispatch(fetchCompetancySuccess([...response.data.data]));
    } else {
      dispatch(fetchCompetancyFailure({ errMsg: "Error in fetching videos" }));
    }
  };
};

export const saveCompetancySuccsess = (data) => {
  return {
    type: SAVE_COMPETANCY_SUCESS,
    payload: data,
  };
};

export const saveCompetancyFailure = (error) => {
  return {
    type: SAVE_COMPETANCY_FAILURE,
    payload: error,
  };
};

export const loadingCompetancy = () => {
  return {
    type: LOADING_COMPETANCY,
  };
};

export const emptyCompetancySave = () => {
  return {
    type: SAVE_COMPETANCY_EMPTY,
  };
};

export const saveCompetancy = (data) => {
  return async (dispatch) => {
    dispatch(loadingCompetancy());
    // const current_level = localStorage.getItem('current_level');
    let response = await post("/api/tennismgmt/competancy/", { ...data });
    if (response.error == false) {
      dispatch(saveCompetancySuccsess([]));
    } else {
      dispatch(saveCompetancyFailure({ errMsg: "Error in saving competency" }));
    }
  };
};

