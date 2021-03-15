import * as categoryActions from './actionCreators/categoryActions';
import * as authActions from './actionCreators/authActions';
import * as registrationActions from './actionCreators/registrationActions';
import * as donorActions from './actionCreators/donorActions';

const actions = {
    ...categoryActions,
    ...authActions,
    ...registrationActions,
    ...donorActions
};

export default actions;