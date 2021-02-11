import * as ActionTypes from '../actionTypes';

const initialState = {
    category: null
};

const categoryReducer = (state = initialState, action) => {
    switch(action.type){
        case ActionTypes.SET_CATEGORY_DONOR: 
            return {category: 'donor'};
        case ActionTypes.SET_CATEGORY_MED:
            return {category: 'med'};
        case ActionTypes.RESET_CATEGORY:
            return {category: null};
        default:
            return {...state};
    }
};

export default categoryReducer;