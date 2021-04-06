import * as ActionTypes from '../actionTypes';
import config from '../../config';
import { addError, removeError } from './errorActions';


const fetchingInbox = () => {
    return({
        type: ActionTypes.FETCHING_INBOX
    });
};

const inboxFailed = () => {
    return({
        type: ActionTypes.INBOX_FAILED
    });
};

const inboxFetched = (payload) => {
    return({
        type: ActionTypes.INBOX_FETCHED,
        payload: payload
    });
};

export const fetchInbox = (props) => (dispatch) => {
    dispatch(fetchingInbox());
    fetch(config.serverUrl+"donor/incoming", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.oToken}`
        }
    }).then(res=> {
        if(res.ok){
            return res.json();
        }
        else{
            var error= new Error();
            error.status=res.status;
            throw error;
        }
    }).then(res=>{
        dispatch(removeError());
        //console.log(res);
        dispatch(inboxFetched(res.inbox));
    }).catch(err => {
        dispatch(inboxFailed());
        dispatch(addError("Couldn't fetch inbox!"))
        //alert("");
    });
}