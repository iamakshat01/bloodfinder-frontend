import * as ActionTypes from '../actionTypes';
import config from '../../config';

const fetchingReqInfo = () => {
    return {
        type: ActionTypes.FETCHING_REQINFO
    };
};

const fetchedReqInfo = (reqInfo) => {
    return {
        type: ActionTypes.REQINFO_FETCHED,
        payload: reqInfo
    };
};

const reqInfoFailed = (errMess) => {
    return {
        type: ActionTypes.REQINFO_FAILED,
        payload: errMess
    };
};

export const reqInfoReset = () => {
    return {
        type: ActionTypes.REQINFO_RESET
    };
};

export const fetchReqInfo = (reqId) => (dispatch) => {
    dispatch(fetchingReqInfo());
    fetch(config.serverUrl+'med/requests/'+reqId, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('oToken')}`
        }
    }).then(res => {
        if(res.ok){
            return res.json();
        }
        else{
            var error = new Error(res.statusText);
            error.status = res.status;
            throw error;
        }
    }).then(reqInfo => {
        dispatch(fetchedReqInfo(reqInfo));
    }).catch(err => {
        dispatch(reqInfoFailed(err.message));
    });
}