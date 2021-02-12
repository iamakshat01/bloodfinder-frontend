import * as ActionTypes from '../actionTypes';

var initialState = {
    processing: false
};

const registrationReducer = (state=initialState, action) => {
    switch(action.type){
        case ActionTypes.REGISTRATION_PROCESSING:
            return {processing: true};
        case ActionTypes.REGISTRATION_SUCCESSFUL:
            return {processing: false};
        case ActionTypes.REGISTRATION_FAILED:
            return {processing: false};
        default:
            return {...state};
    }
};

export default registrationReducer;