import * as ActionTypes from '../actionTypes';
import store from '../storeConfig';
import config from '../../config';

const processRegistration = () => {
    return {
        type: ActionTypes.REGISTRATION_PROCESSING
    };
};

const loggedIn = (info) => {
    return {
        type: ActionTypes.LOGGED_IN,
        payload: info
    };
};

const registrationSuccessful = () => {
    return {
        type: ActionTypes.REGISTRATION_SUCCESSFUL
    };
};

const registrationFailed = () => {
    return {
        type: ActionTypes.REGISTRATION_FAILED
    };
};

export const register = (creds) => (dispatch) => {
    dispatch(processRegistration());
    let cat = creds.cat;
    console.log(creds,"cat");
    delete creds.cat
    fetch(config.serverUrl+cat+'/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(creds),
        credentials: 'same-origin'
    }).then(res => {
        if(res.ok)
            return res.json();
        else{
            var error = new Error("Registration Failed!");
            throw error;
        }
    }).then(res => {
        dispatch(loggedIn(res.user));
        // localStorage.setItem('oUser',JSON.stringify(res.user));
        // localStorage.setItem('oToken',res.token);
        dispatch(registrationSuccessful());
        window.location.href=(config.baseUrl+'/home');
    }).catch(err => {
        alert(err.message);
        dispatch(registrationFailed());
    });
};