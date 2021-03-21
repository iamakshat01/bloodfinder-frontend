import * as categoryActions from './actionCreators/categoryActions';
import * as authActions from './actionCreators/authActions';
import * as registrationActions from './actionCreators/registrationActions';
import * as donorActions from './actionCreators/donorActions';
import * as requestActions from './actionCreators/requestActions';
import * as reqInfoActions from './actionCreators/reqInfoActions';

const actions = {
    ...categoryActions,
    ...authActions,
    ...registrationActions,
    ...donorActions,
    ...requestActions,
    ...reqInfoActions
};

export default actions;