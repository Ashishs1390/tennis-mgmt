import { combineReducers } from "redux";

// import searchReducer from './search/searchReducer';
import {
  reducer,
  initalFetchReducer,
  validateEmailReducer,
} from "./basicInfo/basicInfoReducer";
import { reducer as videoAnalysisReducer } from "./videoanalysis/videoAnalysisReducer";
import {
  initalCompetnacyReducer,
  initalPDPReducer,
} from "./competancy/competancyReducer";
import {
  initalVideoReducer,
  initalCompareReducer,
} from "./videoanalysis/videoAnalysisReducer";
import { linkPlayerReducer } from "./link-player/linkPlayerReducer";

const rootReducer = combineReducers({
  registration: reducer,
  getData: initalFetchReducer,
  emailValidation: validateEmailReducer,
  videoAnalysis: videoAnalysisReducer,
  videoInfo: initalVideoReducer,
  videoCompare: initalCompareReducer,
  competancy: initalCompetnacyReducer,
  personalDevelopment: initalPDPReducer,
  linkPlayerReducer: linkPlayerReducer,
});

export default rootReducer;
