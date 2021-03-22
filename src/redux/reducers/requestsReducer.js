import * as actionTypes from '../actionTypes';

const initialState = {
    reqsLoading: false,
    reqs: [],
    reqsFailed: false
};

const requestsReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.FETCHING_REQUESTS:
            return {...state,reqsLoading:true};
        case actionTypes.REQUESTS_FETCHED:
            return {...state,reqsLoading:false, reqs:action.payload};
        case actionTypes.REQUESTS_FAILED:
            return {...state, reqsFailed:true, reqsLoading: false};
        case actionTypes.REQUESTS_RESET:
            return {...initialState};
        default:
            return {...state};
    }
};

export default requestsReducer;