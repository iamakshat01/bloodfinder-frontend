import * as errorActions from './actionCreators/errorActions'
import * as authActions from './actionCreators/authActions';
import * as registrationActions from './actionCreators/registrationActions';
import * as donorActions from './actionCreators/donorActions';
import * as inboxActions from './actionCreators/inboxActions.js';
import * as requestActions from './actionCreators/requestActions';
import * as reqInfoActions from './actionCreators/reqInfoActions';

const actions = {
   
    ...authActions,
    ...registrationActions,
    ...donorActions,
    ...inboxActions,
    ...requestActions,
    ...reqInfoActions,
    ...errorActions
};

export default actions;