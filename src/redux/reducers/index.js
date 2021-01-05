import companyInfo from './companyInfo';
import enteredCallNumber from './enterCallNumber';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    companyInfo, enteredCallNumber
})

export default rootReducer;