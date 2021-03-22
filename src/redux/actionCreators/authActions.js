import * as ActionTypes from '../actionTypes';
import config from '../../config';

const loggingIn = () => {
    return {
        type: ActionTypes.LOGGING_IN
    };
};

const loggedIn = (info) => {
    return {
        type: ActionTypes.LOGGED_IN,
        payload: info
    };
};

const logInFailed = () => {
    return {
        type: ActionTypes.LOGIN_FAILED
    };
};

export const logIn = (creds) => (dispatch) => {
    dispatch(loggingIn());
    let cat = creds.category;
    fetch(config.serverUrl+cat+'/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: creds.username,
            password: creds.password
        }),
        credentials: 'same-origin'
    }).then(res => {
        if(res.ok)
            return res.json();
        else{
            var error = new Error("SignIn Failed !");
            throw error;
        }
    }).then(res => {
        dispatch(loggedIn(res.user));
        localStorage.setItem('oUser',JSON.stringify(res.user));
        localStorage.setItem('oToken',res.token);
        alert("LogIn Successful.");
        window.location.href=(config.baseUrl+'/home');
        
    }).catch(err => {
        dispatch(logInFailed());
        alert(err.message);
    });
};

const loggingOut = () => {
    return {
        type: ActionTypes.LOGGING_OUT
    };
};

const loggedOut = () => {
    return {
        type: ActionTypes.LOGGED_OUT
    };
};

export const logOut = (category) => (dispatch) => {
    dispatch(loggingOut());
    localStorage.removeItem('oToken');
    localStorage.removeItem('oUser');
    dispatch(loggedOut());
    alert("Signed Out Successfully!");
};