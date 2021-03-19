import * as ActionTypes from '../actionTypes';

const initialState = {
    fetching_inbox: false,
    inbox: []
};

const inboxReducer = (state=initialState, action) => {
    switch(action.type){
        case ActionTypes.FETCHING_INBOX:
            return {...state,fetching_inbox: true};
        case ActionTypes.INBOX_FETCHED:
            return {...state,fetching_inbox: false, inbox: action.payload};
        case ActionTypes.INBOX_FAILED:
            return {...state, fetching_inbox: false}
        default: 
            return {...state};
    }
}

export default inboxReducer;