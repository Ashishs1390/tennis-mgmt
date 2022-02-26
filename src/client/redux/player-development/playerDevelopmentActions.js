import {
  FETCH_PERSONALDEV_COMP_SUCCESS,
  FETCH_PERSONALDEV_COMP_FAILURE,
  GET_PERSONALDEV_COMP_LOADING,
  GET_PERSONALDEV_COMP_SUCCESS,
  GET_PERSONALDEV_COMP_FAILURE,
} from "./playerDevelopmentActionTypes";
import { get, post } from "../../api/axios.api";

export const fetchPersonalDevComp = (data) => {
  return {
    type: FETCH_PERSONALDEV_COMP_SUCCESS,
    payload: data,
  };
};

export const fetchPersnalDevError = () => {
  return {
    type: FETCH_PERSONALDEV_COMP_FAILURE,
    payload: error,
  };
};

export const getPersonalDevCompLoad = (data) => {
  return {
    type: GET_PERSONALDEV_COMP_LOADING
  };
};

export const getPersonalDevComp = (data) => {
  return {
    type: GET_PERSONALDEV_COMP_SUCCESS,
    payload: data,
  };
};

export const getPersnalDevError = () => {
  return {
    type: GET_PERSONALDEV_COMP_FAILURE,
    payload: error,
  };
};

export const getPersonalDevPageInfo = (current_level) => {
  return async (dispatch) => {
    dispatch(getPersonalDevCompLoad());
    let response = await get("/api/tennismgmt/competancy/assessment",{
      params: { current_level: current_level },
    });
    if (response.error == false) {
      dispatch(fetchPersonalDevComp({ ...response.data.data }));
    } else {
      dispatch(fetchPersnalDevError({ errMsg: "not able to list competancy" }));
    }
  };
};


export const getPersonalDevOnDate = (dates) => {
  console.log("--------dates----------");
  console.log([dates.player, dates.parent, dates.coach]);
  return async (dispatch) => {
    dispatch(getPersonalDevCompLoad());
    let response = await get("/api/tennismgmt/competancy/assessment",{
      params: { dates_arr : JSON.stringify([...dates.player, ...dates.parent, ...dates.coach].filter(x => x && typeof x === "string")) },
    });
    if (response.error == false) {
      dispatch(getPersonalDevComp({ ...response.data.data }));
    } else {
      dispatch(getPersnalDevError({ errMsg: "not able to list competancy" }));
    }
  };
};
