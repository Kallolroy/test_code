import axios from '../../utils/axios';

import {
    GET_OPTSLOTS_REQUEST,
    GET_OPTSLOTS_SUCCESS,
    GET_OPTSLOTS_FAILURE,
    GET_OPTSLOT_REQUEST,
    GET_OPTSLOT_SUCCESS,
    GET_OPTSLOT_FAILURE,
    EDIT_OPTSLOT_REQUEST,
    EDIT_OPTSLOT_SUCCESS,
    EDIT_OPTSLOT_FAILURE,
    ADD_OPTSLOT_REQUEST,
    ADD_OPTSLOT_SUCCESS,
    ADD_OPTSLOT_FAILURE
} from '../../action-types/company/opt-slot-types';

import { setError } from '../error-actions';

export const setGetOptSlotsRequest = isLoading => ({
    type: GET_OPTSLOTS_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetOptSlotsSuccess = response => ({
    type: GET_OPTSLOTS_SUCCESS,
    payload: {
        optSlots: response
    }
});

export const setGetOptSlotsFailure = error => ({
    type: GET_OPTSLOTS_FAILURE,
    payload: {
        error
    }
});

export const setGetOptSlotRequest = isLoading => ({
    type: GET_OPTSLOT_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetOptSlotSuccess = response => ({
    type: GET_OPTSLOT_SUCCESS,
    payload: {
        optSlot: response
    }
});

export const setGetOptSlotFailure = error => ({
    type: GET_OPTSLOT_FAILURE,
    payload: {
        error
    }
});


export const setEditOptSlotRequest = isLoading => ({
    type: EDIT_OPTSLOT_REQUEST,
    payload: {
        isLoading
    }
});

export const setEditOptSlotSuccess = response => ({
    type: EDIT_OPTSLOT_SUCCESS,
    payload: {
        optSlot: response
    }
});

export const setEditOptSlotFailure = error => ({
    type: EDIT_OPTSLOT_FAILURE,
    payload: {
        error
    }
});

export const setAddOptSlotRequest = isLoading => ({
    type: ADD_OPTSLOT_REQUEST,
    payload: {
        isLoading
    }
});

export const setAddOptSlotSuccess = response => ({
    type: ADD_OPTSLOT_SUCCESS,
    payload: {
        optSlot: response
    }
});

export const setAddOptSlotFailure = error => ({
    type: ADD_OPTSLOT_FAILURE,
    payload: {
        error
    }
});


export const fetchCompanyOptSlots = (id) => async dispatch => {
    const url = `admin/companies/${id}/opt-slots`
    dispatch(setGetOptSlotsRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetOptSlotsSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetOptSlotsFailure(err));
            dispatch(setError(err));
        });
};

export const fetchOPTSLOTById = (id) => async dispatch => {
    const url = `optslots/${id}`
    dispatch(setGetOptSlotRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetOptSlotSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetOptSlotFailure(err));
            dispatch(setError(err));
        });
};

export const editOPTSLOT = (data) => async dispatch => {
    const url = `optslots/${data.id}`
    dispatch(setEditOptSlotRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditOptSlotSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditOptSlotFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const addOPTSLOT = (data) => async dispatch => {
    const url = `optslots`
    dispatch(setAddOptSlotRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddOptSlotSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddOptSlotFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};
