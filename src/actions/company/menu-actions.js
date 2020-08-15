import axios from '../../utils/axios';

import {
    GET_MENUS_REQUEST,
    GET_MENUS_SUCCESS,
    GET_MENUS_FAILURE,
    GET_MENU_REQUEST,
    GET_MENU_SUCCESS,
    GET_MENU_FAILURE,
    EDIT_MENU_REQUEST,
    EDIT_MENU_SUCCESS,
    EDIT_MENU_FAILURE,
    PUBLISH_MENU_REQUEST,
    ADD_MENU_REQUEST,
    ADD_MENU_SUCCESS,
    ADD_MENU_FAILURE,
    DELETE_MENU_REQUEST,
    DELETE_MENU_SUCCESS,
    DELETE_MENU_FAILURE
} from '../../action-types/company/menu-types';

import { setError } from '../error-actions';

export const setGetMenusRequest = isLoading => ({
    type: GET_MENUS_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetMenusSuccess = response => ({
    type: GET_MENUS_SUCCESS,
    payload: {
        menus: response
    }
});

export const setGetMenusFailure = error => ({
    type: GET_MENUS_FAILURE,
    payload: {
        error
    }
});

export const setGetMenuRequest = isLoading => ({
    type: GET_MENU_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetMenuSuccess = response => ({
    type: GET_MENU_SUCCESS,
    payload: {
        menu: response
    }
});

export const setGetMenuFailure = error => ({
    type: GET_MENU_FAILURE,
    payload: {
        error
    }
});

export const setPublishMenuRequest = isPublishing => ({
    type: PUBLISH_MENU_REQUEST,
    payload: {
        isPublishing
    }
});

export const setEditMenuRequest = isLoading => ({
    type: EDIT_MENU_REQUEST,
    payload: {
        isLoading
    }
});

export const setEditMenuSuccess = response => ({
    type: EDIT_MENU_SUCCESS,
    payload: {
        menu: response
    }
});

export const setEditMenuFailure = error => ({
    type: EDIT_MENU_FAILURE,
    payload: {
        error
    }
});

export const setAddMenuRequest = isLoading => ({
    type: ADD_MENU_REQUEST,
    payload: {
        isLoading
    }
});

export const setAddMenuSuccess = response => ({
    type: ADD_MENU_SUCCESS,
    payload: {
        menu: response
    }
});

export const setAddMenuFailure = error => ({
    type: ADD_MENU_FAILURE,
    payload: {
        error
    }
});

export const setDeleteMenuRequest = isLoading => ({
    type: DELETE_MENU_REQUEST,
    payload: {
        isLoading
    }
});

export const setDeleteMenuSuccess = response => ({
    type: DELETE_MENU_SUCCESS,
    payload: {
        menu: response
    }
});

export const setDeleteMenuFailure = error => ({
    type: DELETE_MENU_FAILURE,
    payload: {
        error
    }
});


export const fetchBranchMenus = (id) => async dispatch => {
    const url = `admin/branches/${id}/menus`
    dispatch(setGetMenusRequest(true));
    await axios
        .get(url)
        .then(res => {
            if (res.data && res.data.data) {
                res.data.data.map((menu) => {
                    try {
                        menu.name = JSON.parse(menu.name.replace(/\\/g, ""))
                    } catch (error) {
                        menu.name = JSON.parse(menu.name.replace(/\\/g, "").slice(1, -1))
                    }
                    return menu;
                })
            }
            dispatch(setGetMenusSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetMenusFailure(err));
            dispatch(setError(err));
        });
};

export const fetchCompanyMenus = (id) => async dispatch => {
    const url = `admin/companies/${id}/menus`
    dispatch(setGetMenusRequest(true));
    await axios
        .get(url)
        .then(res => {
            if (res.data && res.data.data) {
                res.data.data.map((menu) => {
                    //let foodItemCopy = JSON.parse(JSON.stringify(foodItem))
                    try {
                        menu.name = JSON.parse(menu.name.replace(/\\/g, ""))
                    } catch (error) {
                        menu.name = JSON.parse(menu.name.replace(/\\/g, "").slice(1, -1))
                    }

                    return menu;
                })
            }
            dispatch(setGetMenusSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetMenusFailure(err));
            dispatch(setError(err));
        });
};

export const fetchMenuById = (id) => async dispatch => {
    const url = `menus/${id}`
    dispatch(setGetMenuRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetMenuSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetMenuFailure(err));
            dispatch(setError(err));
        });
};

export const editMenu = (data, id) => async dispatch => {
    const url = `admin/menus/${id}`
    dispatch(setEditMenuRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditMenuSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditMenuFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const changeMenuStatus = (id, isActive) => async dispatch => {
    const url = `admin/menus/${id}/is-active/${isActive}`
    dispatch(setEditMenuRequest(true));
    await axios
        .patch(url)
        .then(res => {
            dispatch(setEditMenuSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditMenuFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const addMenu = (data) => async dispatch => {
    const url = `admin/menus`
    dispatch(setAddMenuRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddMenuSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddMenuFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const copyMenu = (data, branchId, id) => async dispatch => {
    const url = `admin/branches/${branchId}/menus/${id}/copy`
    dispatch(setAddMenuRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddMenuSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddMenuFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const overrideMenu = (data, branchId, id) => async dispatch => {
    const url = `admin/branches/${branchId}/menus/${id}/override`
    dispatch(setAddMenuRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddMenuSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddMenuFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const publishMenu = (companyId, menuId) => async dispatch => {
    const url = `admin/companies/${menuId}/menus/publish?companyId=${companyId}&menuId=${menuId}`
    let response = [];
    dispatch(setPublishMenuRequest(true));
    await axios
        .post(url)
        .then(res => {
            dispatch(setEditMenuSuccess(res.data));
            response = res
        })
        .catch(err => {
            dispatch(setEditMenuFailure(err));
            dispatch(setError(err));
            response = err
        });
    return response
};

export const deleteMenu = (id) => async dispatch => {
    const url = `admin/menus/${id}`
    dispatch(setDeleteMenuRequest(true));
    await axios
        .delete(url)
        .then(res => {
            dispatch(setDeleteMenuSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setDeleteMenuFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};
