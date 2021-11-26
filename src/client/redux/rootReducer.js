import {combineReducers} from 'redux';

// import searchReducer from './search/searchReducer';
import  {reducer,initalFetchReducer, validateEmailReducer } from './basicInfo/basicInfoReducer'

const rootReducer = combineReducers({
    data:reducer,
    getData:initalFetchReducer,
    emailValidation: validateEmailReducer
    
});

export default rootReducer;