import axios from '../../utils/axios';

import {
    GET_SERVING_HOURS_REQUEST,
    GET_SERVING_HOURS_SUCCESS,
    GET_SERVING_HOURS_FAILURE,

    ADD_SERVING_HOUR_REQUEST,
    ADD_SERVING_HOUR_SUCCESS,
    ADD_SERVING_HOUR_FAILURE,

    EDIT_SERVING_HOUR_REQUEST,
    EDIT_SERVING_HOUR_SUCCESS,
    EDIT_SERVING_HOUR_FAILURE,

    DELETE_SERVING_HOUR_REQUEST,
    DELETE_SERVING_HOUR_SUCCESS,
    DELETE_SERVING_HOUR_FAILURE
} from '../../action-types/company/serving-hour-types';

import { setError } from '../error-actions';
const servingHourUrl = '/admin/operation-slots';

export const setGetServingHoursRequest = isLoading => ({
    type: GET_SERVING_HOURS_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetServingHoursSuccess = response => ({
    type: GET_SERVING_HOURS_SUCCESS,
    payload: {
        servingHours: response
    }
});

export const setGetServingHoursFailure = error => ({
    type: GET_SERVING_HOURS_FAILURE,
    payload: {
        error
    }
});

export const setEditServingHourRequest = isLoading => ({
    type: EDIT_SERVING_HOUR_REQUEST,
    payload: {
        isLoading
    }
});

export const setEditServingHourSuccess = response => ({
    type: EDIT_SERVING_HOUR_SUCCESS,
    payload: {
        servingHour: response
    }
});

export const setEditServingHoursFailure = error => ({
    type: EDIT_SERVING_HOUR_FAILURE,
    payload: {
        error
    }
});

export const setAddServingHoursRequest = isLoading => ({
    type: ADD_SERVING_HOUR_REQUEST,
    payload: {
        isLoading
    }
});

export const setAddServingHourSuccess = response => ({
    type: ADD_SERVING_HOUR_SUCCESS,
    payload: {
        servingHour: response
    }
});

export const setAddServingHourFailure = error => ({
    type: ADD_SERVING_HOUR_FAILURE,
    payload: {
        error
    }
});

export const setDeleteServingHourRequest = isLoading => ({
    type: DELETE_SERVING_HOUR_REQUEST,
    payload: {
        isLoading
    }
});

export const setDleteServingHourSuccess = response => ({
    type: DELETE_SERVING_HOUR_SUCCESS,
    payload: {
        servingHour: response
    }
});

export const setDeleteServingHourFailure = error => ({
    type: DELETE_SERVING_HOUR_FAILURE,
    payload: {
        error
    }
});

export const fetchCompanyServingHours = (companyId) => async dispatch => {
    const url = `/admin/companies/${companyId}/opt-slots`;
    let response = null
    dispatch(setGetServingHoursRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetServingHoursSuccess(res.data));
            response = res.data
        })
        .catch(err => {
            dispatch(setGetServingHoursFailure(err));
            dispatch(setError(err));
            response = err
        });
    return response
};

export const fetchBranchServingHours = (companyId, branchId) => async dispatch => {
    const url = `/admin/companies/${companyId}/branch/${branchId}/opt-slots`;
    let response = null
    dispatch(setGetServingHoursRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetServingHoursSuccess(res.data));
            response = res.data
        })
        .catch(err => {
            dispatch(setGetServingHoursFailure(err));
            dispatch(setError(err));
            response = err
        });
    return response
};


export const editServingHour = (data) => async dispatch => {
    const url = `${servingHourUrl}/${data.id}`;
    dispatch(setEditServingHourRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditServingHourSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditServingHoursFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const addServingHour = (data) => async dispatch => {
    const url = `${servingHourUrl}`;
    dispatch(setAddServingHoursRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddServingHourSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddServingHourFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const deleteServingHour = (id) => async dispatch => {
    const url = `${servingHourUrl}/${id}`;
    dispatch(setDeleteServingHourRequest(true));
    await axios
        .delete(url)
        .then(res => {
            dispatch(setDleteServingHourSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setDeleteServingHourFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};
