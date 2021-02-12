import {combineReducers} from 'redux';

import categoryReducer from './reducers/categoryReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    category: categoryReducer,
    auth: authReducer
});

export default rootReducer;