import {
    FETCH_COMPETANCY_AGGREGATION,
    FETCH_COMPETANCY_AGGREGATION_SUCCESS,
    FETCH_COMPETANCY_AGGREGATION_FAILURE
} from './competancyAggregationActionType';

const initalAggrState = {
    aggrData: [],
    aggError: {},
    loading: false,
};

export const initalAggrReducer = (state = initalAggrState,action) => {
    switch (action.type) {
        case FETCH_COMPETANCY_AGGREGATION:
            return {
                ...state,
                loading: true   
            }
        
        case FETCH_COMPETANCY_AGGREGATION_SUCCESS:
            return {
                ...state,
                aggrData: action.payload,
                loading: false,
            }
        
        case FETCH_COMPETANCY_AGGREGATION_FAILURE:
            return {
                ...state,
                loading: false,
                aggError: { ...action.payload }
            }
        default:
            return state
             
    }
};
