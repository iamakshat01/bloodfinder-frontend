import * as ActionTypes from '../actionTypes';

export const setMedCategory = () => {
    return {
        type: ActionTypes.SET_CATEGORY_MED
    };
};

export const setDonorCategory = () => {
    return {
        type: ActionTypes.SET_CATEGORY_DONOR
    };
};

export const resetCategory = () => {
    return {
        type: ActionTypes.RESET_CATEGORY
    };
};