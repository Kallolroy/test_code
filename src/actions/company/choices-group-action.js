import axios from '../../utils/axios';

import {
    GET_CHOICES_GROUPS_REQUEST,
    GET_CHOICES_GROUPS_SUCCESS,
    GET_CHOICES_GROUPS_FAILURE,

    GET_CHOICES_GROUP_REQUEST,
    GET_CHOICES_GROUP_SUCCESS,
    GET_CHOICES_GROUP_FAILURE,

    ADD_CHOICES_GROUP_REQUEST,
    ADD_CHOICES_GROUP_SUCCESS,
    ADD_CHOICES_GROUP_FAILURE,

    EDIT_CHOICES_GROUP_REQUEST,
    EDIT_CHOICES_GROUP_SUCCESS,
    EDIT_CHOICES_GROUP_FAILURE,

    DELETE_CHOICES_GROUP_REQUEST,
    DELETE_CHOICES_GROUP_SUCCESS,
    DELETE_CHOICES_GROUP_FAILURE
} from '../../action-types/company/choices-group-types';

import { setError } from '../error-actions';

export const setGetChoicesGroupsRequest = isLoading => ({
    type: GET_CHOICES_GROUPS_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetChoicesGroupsSuccess = response => ({
    type: GET_CHOICES_GROUPS_SUCCESS,
    payload: {
        choicesGroups: response
    }
});

export const setGetChoicesGroupsFailure = error => ({
    type: GET_CHOICES_GROUPS_FAILURE,
    payload: {
        error
    }
});

export const setGetChoicesGroupRequest = isLoading => ({
    type: GET_CHOICES_GROUP_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetChoicesGroupSuccess = response => ({
    type: GET_CHOICES_GROUP_SUCCESS,
    payload: {
        choicesGroup: response
    }
});

export const setGetChoicesGroupFailure = error => ({
    type: GET_CHOICES_GROUP_FAILURE,
    payload: {
        error
    }
});

export const setEditChoicesGroupRequest = isLoading => ({
    type: EDIT_CHOICES_GROUP_REQUEST,
    payload: {
        isLoading
    }
});

export const setEditChoicesGroupSuccess = response => ({
    type: EDIT_CHOICES_GROUP_SUCCESS,
    payload: {
        choicesGroup: response
    }
});

export const setEditChoicesGroupFailure = error => ({
    type: EDIT_CHOICES_GROUP_FAILURE,
    payload: {
        error
    }
});

export const setAddChoicesGroupRequest = isLoading => ({
    type: ADD_CHOICES_GROUP_REQUEST,
    payload: {
        isLoading
    }
});

export const setAddChoicesGroupSuccess = response => ({
    type: ADD_CHOICES_GROUP_SUCCESS,
    payload: {
        choicesGroup: response
    }
});

export const setAddChoicesGroupFailure = error => ({
    type: ADD_CHOICES_GROUP_FAILURE,
    payload: {
        error
    }
});

export const setDeleteChoicesGroupRequest = isLoading => ({
    type: DELETE_CHOICES_GROUP_REQUEST,
    payload: {
        isLoading
    }
});

export const setDleteChoicesGroupSuccess = response => ({
    type: DELETE_CHOICES_GROUP_SUCCESS,
    payload: {
        choicesGroup: response
    }
});

export const setDeleteChoicesGroupFailure = error => ({
    type: DELETE_CHOICES_GROUP_FAILURE,
    payload: {
        error
    }
});

// Get choicesgroups list by company id
export const fetchCompanyChoicesGroups = (companyId) => async dispatch => {
    const url = `/admin/companies/${companyId}/choices-categories`;
    dispatch(setGetChoicesGroupsRequest(true));
    await axios
        .get(url)
        .then(res => {
            if (res.data && res.data.data) {
                res.data.data.map((cGroup) => {
                    try {
                        cGroup.name = JSON.parse(cGroup.name.replace(/\\/g, ""))
                        // cGroup.description = JSON.parse(cGroup.description.replace(/\\/g, ""))

                        cGroup.choicesItems && cGroup.choicesItems.map((cItem) => {
                            try {
                                cItem.name = JSON.parse(cItem.name.replace(/\\/g, ""))
                            } catch (err) {
                                cItem.name = JSON.parse(cItem.name.replace(/\\/g, "").slice(1, -1))
                            }

                            return cItem
                        })
                    } catch (error) {
                        cGroup.name = cGroup.name ? JSON.parse(cGroup.name.replace(/\\/g, "").slice(1, -1)) : { "en-US": "" }
                        // cGroup.description = cGroup.description ? JSON.parse(cGroup.description.replace(/\\/g, "").slice(1, -1)) : { "en-US": "" }
                        cGroup.choicesItems && cGroup.choicesItems.map((cItem) => {
                            try {
                                cItem.name = JSON.parse(cItem.name.replace(/\\/g, ""))
                            } catch (err) {
                                cItem.name = JSON.parse(cItem.name.replace(/\\/g, "").slice(1, -1))
                            }
                            return cItem
                        })
                    }

                    return cGroup;
                })
            }
            dispatch(setGetChoicesGroupsSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetChoicesGroupsFailure(err));
            dispatch(setError(err));
        });
};

// Get choicesgroup by choicesGroup id
export const fetchChoiceGroup = (id) => async dispatch => {
    const url = `/admin/choices-categories/${id}`;
    dispatch(setGetChoicesGroupRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetChoicesGroupSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetChoicesGroupFailure(err));
            dispatch(setError(err));
        });
};


export const editChoicesGroup = (data) => async dispatch => {
    const url = `/admin/choices-categories/${data.id}`;
    dispatch(setEditChoicesGroupRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditChoicesGroupSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditChoicesGroupFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const changeChoicesGroupStatus = (id, isActive) => async dispatch => {
    const url = `/admin/choices-categories/${id}/is-active/${isActive}`;
    dispatch(setEditChoicesGroupRequest(true));
    await axios
        .patch(url)
        .then(res => {
            dispatch(setEditChoicesGroupSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditChoicesGroupFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const addChoicesGroup = (data) => async dispatch => {
    const url = `/admin/choices-categories`;
    dispatch(setAddChoicesGroupRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddChoicesGroupSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddChoicesGroupFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const deleteChoicesGroup = (id) => async dispatch => {
    const url = `/admin/choices-categories/${id}`;
    dispatch(setDeleteChoicesGroupRequest(true));
    await axios
        .delete(url)
        .then(res => {
            dispatch(setDleteChoicesGroupSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setDeleteChoicesGroupFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};
