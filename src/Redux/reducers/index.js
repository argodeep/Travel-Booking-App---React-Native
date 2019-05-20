import {combineReducers} from 'redux';
import fontShowReducer from './fontShowReducer.js';
import roundTripReducer from './roundTripReducer.js';
import increaseDecreaseReducer from './increaseDecreaseReducer';


const allReducers= combineReducers({
  loaded: fontShowReducer,
  roundDate: roundTripReducer,
  person: increaseDecreaseReducer
});
export default allReducers;