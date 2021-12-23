import {combineReducers} from 'redux';

// import searchReducer from './search/searchReducer';
import  {reducer,initalFetchReducer, validateEmailReducer } from './basicInfo/basicInfoReducer';
import  {reducer as  videoAnalysisReducer } from './videoanalysis/videoAnalysisReducer';
import {initalCompetnacyReducer} from './competancy/competancyReducer'
import {initalVideoReducer,initalCompareReducer} from './videoanalysis/videoAnalysisReducer'

const rootReducer = combineReducers({
    data:reducer,
    getData:initalFetchReducer,
    emailValidation: validateEmailReducer,
    videoAnalysis: videoAnalysisReducer,
    videoInfo: initalVideoReducer,
    videoCompare:initalCompareReducer,
    competancy:initalCompetnacyReducer
});

export default rootReducer;