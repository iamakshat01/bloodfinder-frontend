import * as categoryActions from './actionCreators/categoryActions';
import * as authActions from './actionCreators/authActions';
import * as registrationActions from './actionCreators/registrationActions';
import * as donorActions from './actionCreators/donorActions';
import * as inboxActions from './actionCreators/inboxActions.js';

const actions = {
    ...categoryActions,
    ...authActions,
    ...registrationActions,
    ...donorActions,
    ...inboxActions
};

export default actions;