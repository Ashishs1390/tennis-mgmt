import {combineReducers} from 'redux';

// import searchReducer from './search/searchReducer';
import basicInfoReducer, { validateEmailReducer } from './basicInfo/basicInfoReducer'

const rootReducer = combineReducers({
    data:basicInfoReducer,
    emailValidation: validateEmailReducer
    
});

export default rootReducer;