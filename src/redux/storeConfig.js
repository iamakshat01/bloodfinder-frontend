import {createStore, applyMiddleware} from 'redux';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import rootReducer from './rootReducer';

const configStore = () => {
    return createStore(rootReducer,applyMiddleware(reduxLogger,reduxThunk));
};

export default configStore();
