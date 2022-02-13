import {
  FETCH_INITIAL_COMPETANCY_SUCESS,
  FETCH_INITIAL_COMPETANCY_FAILURE,
  UPDATE_COMPETANCY_WEIGHT,
  SAVE_COMPETANCY_SUCESS,
  SAVE_COMPETANCY_FAILURE,
  LOADING_COMPETANCY,
  SAVE_COMPETANCY_EMPTY
} from "./competancyActionTypes";

const initalCompetnacyState = {
  competancyData: [],
  competancyError: {},
  loading: false,
  isSaved: null,
};

export const initalCompetnacyReducer = (
  state = initalCompetnacyState,
  action
) => {
  switch (action.type) {
    case LOADING_COMPETANCY: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_INITIAL_COMPETANCY_SUCESS:
      return {
        ...state,
        competancyData: action.payload,
        competancyError: {},
        loading: false,
      };
    case FETCH_INITIAL_COMPETANCY_FAILURE:
      return {
        ...state,
        competancyData: [],
        competancyError: { ...action.payload },
        loading: false,
      };
    case UPDATE_COMPETANCY_WEIGHT: {
      const competancyData = JSON.parse(JSON.stringify(state.competancyData));
      const data = action.payload;
      competancyData[data.bundel].values[data.competancy].assigned_weight =
        data.weight;
      return {
        ...state,
        competancyData: [...competancyData],
        loading: false,
      };
    }
    case SAVE_COMPETANCY_SUCESS:
      return {
        ...state,
        competancyData: [],
        competancyError: {},
        loading: false,
        isSaved: true
      };
    case SAVE_COMPETANCY_FAILURE:
      return {
        ...state,
        competancyError: { ...action.payload },
        loading: false,
        isSaved: false,
      };
    case SAVE_COMPETANCY_EMPTY: 
      return {
        ...state,
        isSaved: null,
      };
    default:
      return state;
  }
};


