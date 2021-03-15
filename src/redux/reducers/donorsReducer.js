import * as ActionTypes from '../actionTypes';

const initialState = {
    fetching_donors: false,
    donors: []
};

const donorsReducer = (state=initialState, action) => {
    switch(action.type){
        case ActionTypes.FETCHING_DONORS:
            return {...state,fetching_donors: true};
        case ActionTypes.DONORS_FETCHED:
            return {...state,fetching_donors: false, donors: action.payload};
        case ActionTypes.DONORS_FAILED:
            return {...state, fetching_donors: false}
        case ActionTypes.DONORS_RESET:
            return {fetching_donors: false, donors: []}
        default: 
            return {...state};
    }
}

export default donorsReducer;