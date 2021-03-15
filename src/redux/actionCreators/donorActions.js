import * as ActionTypes from '../actionTypes';
import config from '../../config';

export const donorReset = () => {
    return {
        type: ActionTypes.DONORS_RESET
    }
};

const fetchingDonors = () => {
    return({
        type: ActionTypes.FETCHING_DONORS
    });
};

const donorsFailed = () => {
    return({
        type: ActionTypes.DONORS_FAILED
    });
};

const donorsFetched = (payload) => {
    return({
        type: ActionTypes.DONORS_FETCHED,
        payload: payload
    });
};

export const fetchDonors = (props) => (dispatch) => {
    dispatch(fetchingDonors());
    fetch(config.serverUrl+"med/search", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.oToken}`
        },
        body: JSON.stringify({
            blood: props.blood_type,
            mxdist: props.range
        })
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
        dispatch(donorsFetched(res.availdonors));
    }).catch(err => {
        dispatch(donorsFailed());
        alert("Couldn't fetch donors!");
    });
}