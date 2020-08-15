import axios from '../../utils/axios';

import {
    GET_BRANCHES_REQUEST,
    GET_BRANCHES_SUCCESS,
    GET_BRANCHES_FAILURE,
    GET_BRANCH_REQUEST,
    GET_BRANCH_SUCCESS,
    GET_BRANCH_FAILURE,
    EDIT_BRANCH_REQUEST,
    EDIT_BRANCH_SUCCESS,
    EDIT_BRANCH_FAILURE,
    ADD_BRANCH_REQUEST,
    ADD_BRANCH_SUCCESS,
    ADD_BRANCH_FAILURE,
    DELETE_BRANCH_REQUEST,
    DELETE_BRANCH_SUCCESS,
    DELETE_BRANCH_FAILURE
} from '../../action-types/company/branch-types';

import { setError } from '../error-actions';

export const setGetBranchesRequest = isLoading => ({
    type: GET_BRANCHES_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetBranchesSuccess = response => ({
    type: GET_BRANCHES_SUCCESS,
    payload: {
        branches: response
    }
});

export const setGetBranchesFailure = error => ({
    type: GET_BRANCHES_FAILURE,
    payload: {
        error
    }
});

export const setGetBranchRequest = isLoading => ({
    type: GET_BRANCH_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetBranchSuccess = response => ({
    type: GET_BRANCH_SUCCESS,
    payload: {
        branch: response
    }
});

export const setGetBranchFailure = error => ({
    type: GET_BRANCH_FAILURE,
    payload: {
        error
    }
});


export const setEditBranchRequest = isLoading => ({
    type: EDIT_BRANCH_REQUEST,
    payload: {
        isLoading
    }
});

export const setEditBranchSuccess = response => ({
    type: EDIT_BRANCH_SUCCESS,
    payload: {
        branch: response
    }
});

export const setEditBranchFailure = error => ({
    type: EDIT_BRANCH_FAILURE,
    payload: {
        error
    }
});

export const setAddBranchRequest = isLoading => ({
    type: ADD_BRANCH_REQUEST,
    payload: {
        isLoading
    }
});

export const setAddBranchSuccess = response => ({
    type: ADD_BRANCH_SUCCESS,
    payload: {
        branch: response
    }
});

export const setAddBranchFailure = error => ({
    type: ADD_BRANCH_FAILURE,
    payload: {
        error
    }
});

export const setDeleteBranchRequest = isLoading => ({
    type: DELETE_BRANCH_REQUEST,
    payload: {
        isLoading
    }
});

export const setDeleteBranchSuccess = response => ({
    type: DELETE_BRANCH_SUCCESS,
    payload: {
        branch: response
    }
});

export const setDeleteBranchFailure = error => ({
    type: DELETE_BRANCH_FAILURE,
    payload: {
        error
    }
});

export const fetchBranches = () => async dispatch => {
    dispatch(setGetBranchesRequest(true));
    await axios
        .get('/admin/branches')
        .then(res => {
            dispatch(setGetBranchesSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetBranchesFailure(err));
            dispatch(setError(err));
        });
};

export const fetchBranchById = (id) => async dispatch => {
    const url = `/admin/branches/${id}`
    dispatch(setGetBranchRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetBranchSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetBranchFailure(err));
            dispatch(setError(err));
        });
};

export const editBranch = (data) => async dispatch => {
    const url = `/admin/branches/${data.id}`
    dispatch(setEditBranchRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditBranchSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditBranchFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const addBranch = (data) => async dispatch => {
    const url = `/admin/branches`
    dispatch(setAddBranchRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddBranchSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddBranchFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const deleteBranch = (id) => async dispatch => {
    const url = `/admin/branches/${id}`
    dispatch(setDeleteBranchRequest(true));
    await axios
        .delete(url)
        .then(res => {
            dispatch(setDeleteBranchSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setDeleteBranchFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

