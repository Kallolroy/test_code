import axios from '../../utils/axios';

import {
    GET_COMPANYSETTINGS_REQUEST,
    GET_COMPANYSETTINGS_SUCCESS,
    GET_COMPANYSETTINGS_FAILURE,
    GET_COMPANYSETTING_REQUEST,
    GET_COMPANYSETTING_SUCCESS,
    GET_COMPANYSETTING_FAILURE,
    EDIT_COMPANYSETTING_REQUEST,
    EDIT_COMPANYSETTING_SUCCESS,
    EDIT_COMPANYSETTING_FAILURE,
    ADD_COMPANYSETTING_REQUEST,
    ADD_COMPANYSETTING_SUCCESS,
    ADD_COMPANYSETTING_FAILURE
} from '../../action-types/company/company-setting-types';

import { setError } from '../error-actions';

export const setGetCompanySettingsRequest = isLoading => ({
    type: GET_COMPANYSETTINGS_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetCompanySettingsSuccess = response => ({
    type: GET_COMPANYSETTINGS_SUCCESS,
    payload: {
        companysettings: response
    }
});

export const setGetCompanySettingsFailure = error => ({
    type: GET_COMPANYSETTINGS_FAILURE,
    payload: {
        error
    }
});

export const setGetCompanySettingRequest = isLoading => ({
    type: GET_COMPANYSETTING_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetCompanySettingSuccess = response => ({
    type: GET_COMPANYSETTING_SUCCESS,
    payload: {
        companysetting: response
    }
});

export const setGetCompanySettingFailure = error => ({
    type: GET_COMPANYSETTING_FAILURE,
    payload: {
        error
    }
});


export const setEditCompanySettingRequest = isLoading => ({
    type: EDIT_COMPANYSETTING_REQUEST,
    payload: {
        isLoading
    }
});

export const setEditCompanySettingSuccess = response => ({
    type: EDIT_COMPANYSETTING_SUCCESS,
    payload: {
        companysetting: response
    }
});

export const setEditCompanySettingFailure = error => ({
    type: EDIT_COMPANYSETTING_FAILURE,
    payload: {
        error
    }
});

export const setAddCompanySettingRequest = isLoading => ({
    type: ADD_COMPANYSETTING_REQUEST,
    payload: {
        isLoading
    }
});

export const setAddCompanySettingSuccess = response => ({
    type: ADD_COMPANYSETTING_SUCCESS,
    payload: {
        companysetting: response
    }
});

export const setAddCompanySettingFailure = error => ({
    type: ADD_COMPANYSETTING_FAILURE,
    payload: {
        error
    }
});


export const fetchCompanySettings = (companyId) => async dispatch => {
    const url = `/admin/companies/${companyId}/company-configs`
    dispatch(setGetCompanySettingsRequest(true));
    let response = null

    await axios
        .get(url)
        .then(res => {
            dispatch(setGetCompanySettingsSuccess(res.data));
            response = res.data
        })
        .catch(err => {
            dispatch(setGetCompanySettingsFailure(err));
            dispatch(setError(err));
            response = err
        });

    return response
};


export const editCompanySetting = (data, companyId) => async dispatch => {
    const url = `/admin/companies/${companyId}/company-configs`
    dispatch(setEditCompanySettingRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditCompanySettingSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditCompanySettingFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const addCompanySetting = (data, companyId) => async dispatch => {
    const url = `/admin/companies/${companyId}/company-configs`
    dispatch(setAddCompanySettingRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddCompanySettingSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddCompanySettingFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};
