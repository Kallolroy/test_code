import axios from '../utils/axios';

import {
    GET_STAFFS_REQUEST,
    GET_STAFFS_SUCCESS,
    GET_STAFFS_FAILURE,

    ADD_STAFF_REQUEST,
    ADD_STAFF_SUCCESS,
    ADD_STAFF_FAILURE,

    EDIT_STAFF_REQUEST,
    EDIT_STAFF_SUCCESS,
    EDIT_STAFF_FAILURE,

    DELETE_STAFF_REQUEST,
    DELETE_STAFF_SUCCESS,
    DELETE_STAFF_FAILURE,

    GET_ROLES_REQUEST,
    GET_ROLES_SUCCESS,
    GET_ROLES_FAILURE,

    SET_STAFF_FORM_INITIAL_VALUES
} from '../action-types/staff-types';

import { setError } from './error-actions';
const staffUrl = '/admin/staffs';

export const setStaffsRequest = isLoading => ({
    type: GET_STAFFS_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetStaffsSuccess = response => ({
    type: GET_STAFFS_SUCCESS,
    payload: {
        staffs: response
    }
});

export const setGetStaffsFailure = error => ({
    type: GET_STAFFS_FAILURE,
    payload: {
        error
    }
});

export const setEditStaffRequest = isLoading => ({
    type: EDIT_STAFF_REQUEST,
    payload: {
        isLoading
    }
});

export const setEditStaffSuccess = response => ({
    type: EDIT_STAFF_SUCCESS,
    payload: {
        staff: response
    }
});

export const setEditStaffsFailure = error => ({
    type: EDIT_STAFF_FAILURE,
    payload: {
        error
    }
});

export const setAddStaffsRequest = isLoading => ({
    type: ADD_STAFF_REQUEST,
    payload: {
        isLoading
    }
});

export const setAddStaffSuccess = response => ({
    type: ADD_STAFF_SUCCESS,
    payload: {
        staff: response
    }
});

export const setAddStaffFailure = error => ({
    type: ADD_STAFF_FAILURE,
    payload: {
        error
    }
});

export const setDeleteStaffRequest = isLoading => ({
    type: DELETE_STAFF_REQUEST,
    payload: {
        isLoading
    }
});

export const setDleteStaffSuccess = response => ({
    type: DELETE_STAFF_SUCCESS,
    payload: {
        staff: response
    }
});

export const setDeleteStaffFailure = error => ({
    type: DELETE_STAFF_FAILURE,
    payload: {
        error
    }
});

export const setRolesRequest = isLoading => ({
    type: GET_ROLES_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetRolesSuccess = response => ({
    type: GET_ROLES_SUCCESS,
    payload: {
        roles: response
    }
});

export const setGetRolesFailure = error => ({
    type: GET_ROLES_FAILURE,
    payload: {
        error
    }
});

export const setStaffFormInitialValues = data => ({
    type: SET_STAFF_FORM_INITIAL_VALUES,
    payload: {
        data
    }
});

export const fetchCompanyStaffs = (companyId) => async dispatch => {
    let url = `${staffUrl}`;
    if (companyId !== null && companyId !== undefined) {
        url += `?companyId=${companyId}`;
    }
    dispatch(setStaffsRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetStaffsSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetStaffsFailure(err));
            dispatch(setError(err));
        });
};

export const fetchBranchStaffs = (branchId, companyId) => async dispatch => {
    let url = `${staffUrl}?branchId=${branchId}&companyId=${companyId}`;
    // if (branchId !== null && branchId !== undefined) {
    //     url += `?branchId=${branchId}`
    // }
    dispatch(setStaffsRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetStaffsSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetStaffsFailure(err));
            dispatch(setError(err));
        });
};

export const fetchKitchenStaffs = (kitchenId) => async dispatch => {
    let url = `${staffUrl}`;
    if (kitchenId !== null && kitchenId !== undefined) {
        url += `?kitchenId=${kitchenId}`
    }
    dispatch(setStaffsRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetStaffsSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetStaffsFailure(err));
            dispatch(setError(err));
        });
};


export const editStaff = (data) => async dispatch => {
    const url = `${staffUrl}/${data.id}`;
    dispatch(setEditStaffRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditStaffSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditStaffsFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const addStaff = (data) => async dispatch => {
    const url = `${staffUrl}`;
    dispatch(setAddStaffsRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddStaffSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddStaffFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const deleteStaff = (id) => async dispatch => {
    const url = `${staffUrl}/${id}`;
    dispatch(setDeleteStaffRequest(true));
    await axios
        .delete(url)
        .then(res => {
            dispatch(setDleteStaffSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setDeleteStaffFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const fetchRoles = () => async dispatch => {
    const url = 'admin/roles';
    dispatch(setRolesRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetRolesSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetRolesFailure(err));
            dispatch(setError(err));
        });
};
