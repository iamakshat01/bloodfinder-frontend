import {combineReducers} from 'redux';
import { createForms } from "react-redux-form";
import categoryReducer from './reducers/categoryReducer';
import authReducer from './reducers/authReducer';
import donorsReducer from './reducers/donorsReducer';
import { InitialReqGen, Initialsignin, Initialsignup } from './form';
import inboxReducer from './reducers/inboxReducer';

const rootReducer = combineReducers({
    category: categoryReducer,
    auth: authReducer,
    donors: donorsReducer,
    inbox: inboxReducer,
    ...createForms({
        signup: Initialsignup,
        signin: Initialsignin,
        reqgen: InitialReqGen
    })
});

export default rootReducer;