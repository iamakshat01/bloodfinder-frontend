import * as actionTypes from '../actionTypes';
import config from '../../config';

const fetchingRequests = () =>{
    return {
        type: actionTypes.FETCHING_REQUESTS
    };
};

const requestsFailed = () =>{
    return {
        type: actionTypes.REQUESTS_FAILED
    };
};

export const resetRequests = () =>{
    return {
        type: actionTypes.REQUESTS_RESET
    };
};

const requestsFetched = (reqs) => {
    return {
        type: actionTypes.REQUESTS_FETCHED,
        payload: reqs
    };
};

export const fetchRequests = () => (dispatch) => {
    dispatch(fetchingRequests());
    fetch(config.serverUrl+'med/requests',{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('oToken')}`
        }
    })
    .then(res => {
        if(res.ok){
            return res.json();
        }
        else{
            var err=new Error("Could not fetch requests.")
            err.status=res.status;
            throw err;
        }
    })
    .then(res => {
        dispatch(requestsFetched(res.response));
    })
    .catch(err => {
        dispatch(requestsFailed());
        alert(err.message);
    });
};

