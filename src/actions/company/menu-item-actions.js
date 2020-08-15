import axios from '../../utils/axios';

import {
    GET_MENUITEMS_REQUEST,
    GET_MENUITEMS_SUCCESS,
    GET_MENUITEMS_FAILURE,
    GET_MENUITEM_REQUEST,
    GET_MENUITEM_SUCCESS,
    GET_MENUITEM_FAILURE,
    EDIT_MENUITEM_REQUEST,
    EDIT_MENUITEM_SUCCESS,
    EDIT_MENUITEM_FAILURE,
    ADD_MENUITEM_REQUEST,
    ADD_MENUITEM_SUCCESS,
    ADD_MENUITEM_FAILURE
} from '../../action-types/company/menu-item-types';

import { setError } from '../error-actions';

export const setGetMenuItemsRequest = isLoading => ({
    type: GET_MENUITEMS_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetMenuItemsSuccess = response => ({
    type: GET_MENUITEMS_SUCCESS,
    payload: {
        menuitems: response
    }
});

export const setGetMenuItemsFailure = error => ({
    type: GET_MENUITEMS_FAILURE,
    payload: {
        error
    }
});

export const setGetMenuItemRequest = isLoading => ({
    type: GET_MENUITEM_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetMenuItemSuccess = response => ({
    type: GET_MENUITEM_SUCCESS,
    payload: {
        menuitem: response
    }
});

export const setGetMenuItemFailure = error => ({
    type: GET_MENUITEM_FAILURE,
    payload: {
        error
    }
});


export const setEditMenuItemRequest = isLoading => ({
    type: EDIT_MENUITEM_REQUEST,
    payload: {
        isLoading
    }
});

export const setEditMenuItemSuccess = response => ({
    type: EDIT_MENUITEM_SUCCESS,
    payload: {
        menuitem: response
    }
});

export const setEditMenuItemFailure = error => ({
    type: EDIT_MENUITEM_FAILURE,
    payload: {
        error
    }
});

export const setAddMenuItemRequest = isLoading => ({
    type: ADD_MENUITEM_REQUEST,
    payload: {
        isLoading
    }
});

export const setAddMenuItemSuccess = response => ({
    type: ADD_MENUITEM_SUCCESS,
    payload: {
        menuitem: response
    }
});

export const setAddMenuItemFailure = error => ({
    type: ADD_MENUITEM_FAILURE,
    payload: {
        error
    }
});

export const fetchMenuMenuItems = (id) => async dispatch => {
    const url = `admin/menus/${id}/food-items`
    dispatch(setGetMenuItemsRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetMenuItemsSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetMenuItemsFailure(err));
            dispatch(setError(err));
        });
};

export const fetchMenuItemById = (id) => async dispatch => {
    const url = `food-items/${id}`
    dispatch(setGetMenuItemRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetMenuItemSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetMenuItemFailure(err));
            dispatch(setError(err));
        });
};

export const editMenuItem = (data) => async dispatch => {
    const url = `food-items/${data.id}`
    dispatch(setEditMenuItemRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditMenuItemSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditMenuItemFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const addMenuItem = (data) => async dispatch => {
    const url = `food-items`
    dispatch(setAddMenuItemRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddMenuItemSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddMenuItemFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};
