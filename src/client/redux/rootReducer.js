import {combineReducers} from 'redux';

// import searchReducer from './search/searchReducer';
import  {reducer,initalFetchReducer, validateEmailReducer } from './basicInfo/basicInfoReducer';
import {initalVideoReducer} from './videoanalysis/videoAnalysisReducer'

const rootReducer = combineReducers({
    data:reducer,
    getData:initalFetchReducer,
    emailValidation: validateEmailReducer,
    videoInfo: initalVideoReducer
    
});

export default rootReducer;