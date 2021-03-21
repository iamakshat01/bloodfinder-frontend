import * as ActionTypes from '../actionTypes';

const initialState = {
    reqInfo_loading: false,
    reqInfo: {},
    reqInfo_failed: false,
    error: ""
}

const reqInfoReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.FETCHING_REQINFO: 
            return {...state,reqInfo_loading: true, reqInfo_failed: false, error:""};
        case ActionTypes.REQINFO_FETCHED:
            return {...state, reqInfo_loading: false, reqInfo: action.payload};
        case ActionTypes.REQINFO_FAILED:
            return {...state, reqInfo_loading: false, reqInfo: {}, reqInfo_failed: true,error:action.payload};
        case ActionTypes.REQINFO_RESET:
            return {...initialState};
        default:
            return {...state};
    }
};

export default reqInfoReducer;