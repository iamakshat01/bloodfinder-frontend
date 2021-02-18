import {combineReducers} from 'redux';
import { createForms } from "react-redux-form";
import categoryReducer from './reducers/categoryReducer';
import authReducer from './reducers/authReducer';
import { Initialsignin, Initialsignup } from './form';

const rootReducer = combineReducers({
    category: categoryReducer,
    auth: authReducer,
    ...createForms({
        signup: Initialsignup,
        signin: Initialsignin
    })
});

export default rootReducer;