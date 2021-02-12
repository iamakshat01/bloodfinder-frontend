import * as categoryActions from './actionCreators/categoryActions';
import * as authActions from './actionCreators/authActions';
import * as registrationActions from './actionCreators/registrationActions';
const actions = {
    ...categoryActions,
    ...authActions,
    ...registrationActions
};

export default actions;