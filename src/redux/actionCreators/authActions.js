import * as ActionTypes from '../actionTypes';
import config from '../../config';
import store from '../storeConfig';

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

const cred = {
    username: 'amitsahu',
    password: 'sahu'
}
export const logIn = (creds) => (dispatch) => {
    dispatch(loggingIn());
    let cat = store.getState().category.category;
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
        dispatch(loggedIn(res.donor));
        alert("LogIn Successful.");
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

const logOutFailed = () => {
    return {
        type: ActionTypes.LOGGED_OUT
    };
};

export const logOut = (category) => (dispatch) => {
    dispatch(loggingOut());
    let cat = store.getState().category.category;
    fetch(config.serverUrl+cat+"/logout").then(res => {
        if(res.ok){
            return res.json();
        }
        else{
            var error = new Error("SignOut Failed!");
            throw error;
        }
    }).then(res => {
        dispatch(loggedOut());
        alert("Signed Out Successfully!");
    }).catch(err => {
        dispatch(logOutFailed());
        alert(err.message);
    });
};