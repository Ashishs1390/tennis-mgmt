import {combineReducers} from 'redux';

// import searchReducer from './search/searchReducer';
import basicInfoReducer from './basicInfo/basicInfoReducer'

const rootReducer = combineReducers({
    data:basicInfoReducer,
    
    
});

export default rootReducer;