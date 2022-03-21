import { get, post, put } from "../../api/axios.api";

import {
    FETCH_COMPETANCY_AGGREGATION,
    FETCH_COMPETANCY_AGGREGATION_SUCCESS,
    FETCH_COMPETANCY_AGGREGATION_FAILURE
} from './competancyAggregationActionType';

export const fetchCompentancyLoader = () => {
    return {
        type: FETCH_COMPETANCY_AGGREGATION
    }
}
const fetchCompetancyDetails = (data) => {
    return {
        type: FETCH_COMPETANCY_AGGREGATION_SUCCESS,
        payload: data
    }
}
const fetchCompetancyFailure = (error) => {
    return {
        type: FETCH_COMPETANCY_AGGREGATION_FAILURE,
        payload: error
    }
}


export const getCompetancyDetails = (selectedPlayers) => {
    return async (dispatch) => {
        dispatch(fetchCompentancyLoader());
        get('/api/tennismgmt/bundleaggdata', {
            params: { selectedPlayers },
        }).then((resp) => {
            console.log(resp.data.data);
            dispatch(fetchCompetancyDetails(resp.data.data));
        }).catch((error) => {
            console.log(error.response.data)
            dispatch(fetchCompetancyFailure(error.response.data));
        });;
    }
}