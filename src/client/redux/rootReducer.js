import {combineReducers} from 'redux';

// import searchReducer from './search/searchReducer';
import  {reducer,initalFetchReducer, validateEmailReducer } from './basicInfo/basicInfoReducer';
import  {reducer as  videoAnalysisReducer } from './videoanalysis/videoAnalysisReducer';


const rootReducer = combineReducers({
    data:reducer,
    getData:initalFetchReducer,
    emailValidation: validateEmailReducer,
    videoAnalysis: videoAnalysisReducer
});

export default rootReducer;