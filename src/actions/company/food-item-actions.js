import axios from '../../utils/axios';

import {
    GET_FOODITEMS_REQUEST,
    GET_FOODITEMS_SUCCESS,
    GET_FOODITEMS_FAILURE,
    GET_MENUFOODITEMS_REQUEST,
    GET_MENUFOODITEMS_SUCCESS,
    GET_MENUFOODITEMS_FAILURE,
    GET_FOODITEM_REQUEST,
    GET_FOODITEM_SUCCESS,
    GET_FOODITEM_FAILURE,
    EDIT_FOODITEM_REQUEST,
    EDIT_FOODITEM_SUCCESS,
    EDIT_FOODITEM_FAILURE,
    ADD_FOODITEM_REQUEST,
    ADD_FOODITEM_SUCCESS,
    ADD_FOODITEM_FAILURE,
    DELETE_FOODITEM_REQUEST,
    DELETE_FOODITEM_SUCCESS,
    DELETE_FOODITEM_FAILURE
} from '../../action-types/company/food-item-types';

import { setError } from '../error-actions';

export const setGetFoodItemsRequest = isLoading => ({
    type: GET_FOODITEMS_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetFoodItemsSuccess = response => ({
    type: GET_FOODITEMS_SUCCESS,
    payload: {
        fooditems: response
    }
});

export const setGetFoodItemsFailure = error => ({
    type: GET_FOODITEMS_FAILURE,
    payload: {
        error
    }
});

export const setGetMenuFoodItemsRequest = isLoading => ({
    type: GET_MENUFOODITEMS_REQUEST,
    payload: {
        isLoading
    }
});
export const setGetMenuFoodItemsSuccess = response => ({
    type: GET_MENUFOODITEMS_SUCCESS,
    payload: {
        menufooditems: response
    }
});

export const setGetMenuFoodItemsFailure = error => ({
    type: GET_MENUFOODITEMS_FAILURE,
    payload: {
        error
    }
});

export const setGetFoodItemRequest = isLoading => ({
    type: GET_FOODITEM_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetFoodItemsuccess = response => ({
    type: GET_FOODITEM_SUCCESS,
    payload: {
        fooditem: response
    }
});

export const setGetFoodItemFailure = error => ({
    type: GET_FOODITEM_FAILURE,
    payload: {
        error
    }
});


export const setEditFoodItemRequest = isLoading => ({
    type: EDIT_FOODITEM_REQUEST,
    payload: {
        isLoading
    }
});

export const setEditFoodItemsuccess = response => ({
    type: EDIT_FOODITEM_SUCCESS,
    payload: {
        fooditem: response
    }
});

export const setEditFoodItemFailure = error => ({
    type: EDIT_FOODITEM_FAILURE,
    payload: {
        error
    }
});

export const setAddFoodItemRequest = isLoading => ({
    type: ADD_FOODITEM_REQUEST,
    payload: {
        isLoading
    }
});

export const setAddFoodItemsuccess = response => ({
    type: ADD_FOODITEM_SUCCESS,
    payload: {
        fooditem: response
    }
});

export const setAddFoodItemFailure = error => ({
    type: ADD_FOODITEM_FAILURE,
    payload: {
        error
    }
});

export const setDeleteFoodItemRequest = isLoading => ({
    type: DELETE_FOODITEM_REQUEST,
    payload: {
        isLoading
    }
});

export const setDeleteFoodItemsuccess = response => ({
    type: DELETE_FOODITEM_SUCCESS,
    payload: {
        fooditem: response
    }
});

export const setDeleteFoodItemFailure = error => ({
    type: DELETE_FOODITEM_FAILURE,
    payload: {
        error
    }
});

export const fetchBranchFoodItems = (companyId, branchId) => async dispatch => {
    // const url = `admin/companies/${companyId}/food-items?branchId=${branchId}`
    const url = `admin/companies/${companyId}/food-items?branchId=${branchId}`
    dispatch(setGetFoodItemsRequest(true));
    await axios
        .get(url)
        .then(res => {
            if (res.data && res.data.data) {
                res.data.data.map((foodItem) => {
                    //let foodItemCopy = JSON.parse(JSON.stringify(foodItem))
                    // foodItem.name = JSON.parse(foodItem.name)
                    try {
                        foodItem.name = JSON.parse(foodItem.name.replace(/\\/g, ""))
                    }
                    catch (err) {
                        foodItem.name = foodItem.name ? JSON.parse(foodItem.name.replace(/\\/g, "").slice(1, -1)) : foodItem.name
                    }

                    try {
                        foodItem.allergyInfo = foodItem.allergyInfo && Object.keys(foodItem.allergyInfo).length > 0 ? JSON.parse(foodItem.allergyInfo.replace(/\\/g, "")) : foodItem.allergyInfo
                    } catch (err) {
                        foodItem.allergyInfo = foodItem.allergyInfo ? JSON.parse(foodItem.allergyInfo.replace(/\\/g, "").slice(1, -1)) : foodItem.allergyInfo
                    }
                    try {
                        foodItem.description = foodItem.description && Object.keys(foodItem.description).length > 0 ? JSON.parse(foodItem.description.replace(/\\/g, "")) : foodItem.description
                    } catch (err) {
                        foodItem.description = foodItem.description ? JSON.parse(foodItem.description.replace(/\\/g, "").slice(1, -1)) : foodItem.description
                    }
                    try {
                        foodItem.ingredients = foodItem.ingredients && Object.keys(foodItem.ingredients).length > 0 ? JSON.parse(foodItem.ingredients.replace(/\\/g, "")) : foodItem.ingredients
                    } catch (err) {
                        foodItem.ingredients = foodItem.ingredients ? JSON.parse(foodItem.ingredients.replace(/\\/g, "").slice(1, -1)) : foodItem.ingredients
                    }
                    try {
                        foodItem.nutritionInfo = foodItem.nutritionInfo && Object.keys(foodItem.nutritionInfo).length ? JSON.parse(foodItem.nutritionInfo.replace(/\\/g, "")) : foodItem.nutritionInfo
                    } catch (err) {
                        foodItem.nutritionInfo = foodItem.nutritionInfo ? JSON.parse(foodItem.nutritionInfo.replace(/\\/g, "").slice(1, -1)) : foodItem.nutritionInfo
                    }
                    try {
                        foodItem.properties = foodItem.properties && Object.keys(foodItem.properties).length > 0 ? JSON.parse(foodItem.properties.replace(/\\/g, "")) : foodItem.properties
                    } catch (err) {
                        foodItem.properties = foodItem.properties ? JSON.parse(foodItem.properties.replace(/\\/g, "").slice(1, -1)) : foodItem.properties
                    }
                    try {
                        foodItem.printableName = foodItem.printableName && Object.keys(foodItem.printableName).length > 0 ? JSON.parse(foodItem.printableName.replace(/\\/g, "")) : foodItem.printableName
                    } catch (err) {
                        foodItem.printableName = foodItem.printableName ? JSON.parse(foodItem.printableName.replace(/\\/g, "").slice(1, -1)) : foodItem.printableName
                    }

                    return foodItem;

                })
            }
            dispatch(setGetFoodItemsSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetFoodItemsFailure(err));
            dispatch(setError(err));
        });
};

export const fetchCategoryFoodItems = (catId) => async dispatch => {
    const url = `admin/food-categories/${catId}/food-items`
    dispatch(setGetFoodItemsRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetFoodItemsSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetFoodItemsFailure(err));
            dispatch(setError(err));
        });
};

export const fetchCompanyFoodItems = (compId) => async dispatch => {
    const url = `admin/companies/${compId}/food-items`
    dispatch(setGetFoodItemsRequest(true));
    await axios
        .get(url)
        .then(res => {
            if (res.data && res.data.data) {
                res.data.data.map((foodItem) => {
                    //let foodItemCopy = JSON.parse(JSON.stringify(foodItem))
                    // foodItem.name = JSON.parse(foodItem.name)
                    try {
                        foodItem.name = JSON.parse(foodItem.name.replace(/\\/g, ""))
                    }
                    catch (err) {
                        foodItem.name = foodItem.name ? JSON.parse(foodItem.name.replace(/\\/g, "").slice(1, -1)) : foodItem.name
                    }

                    try {
                        foodItem.allergyInfo = foodItem.allergyInfo && Object.keys(foodItem.allergyInfo).length > 0 ? JSON.parse(foodItem.allergyInfo.replace(/\\/g, "")) : foodItem.allergyInfo
                    } catch (err) {
                        foodItem.allergyInfo = foodItem.allergyInfo ? JSON.parse(foodItem.allergyInfo.replace(/\\/g, "").slice(1, -1)) : foodItem.allergyInfo
                    }
                    try {
                        foodItem.description = foodItem.description && Object.keys(foodItem.description).length > 0 ? JSON.parse(foodItem.description.replace(/\\/g, "")) : foodItem.description
                    } catch (err) {
                        foodItem.description = foodItem.description ? JSON.parse(foodItem.description.replace(/\\/g, "").slice(1, -1)) : foodItem.description
                    }
                    try {
                        foodItem.ingredients = foodItem.ingredients && Object.keys(foodItem.ingredients).length > 0 ? JSON.parse(foodItem.ingredients.replace(/\\/g, "")) : foodItem.ingredients
                    } catch (err) {
                        foodItem.ingredients = foodItem.ingredients ? JSON.parse(foodItem.ingredients.replace(/\\/g, "").slice(1, -1)) : foodItem.ingredients
                    }
                    try {
                        foodItem.nutritionInfo = foodItem.nutritionInfo && Object.keys(foodItem.nutritionInfo).length ? JSON.parse(foodItem.nutritionInfo.replace(/\\/g, "")) : foodItem.nutritionInfo
                    } catch (err) {
                        foodItem.nutritionInfo = foodItem.nutritionInfo ? JSON.parse(foodItem.nutritionInfo.replace(/\\/g, "").slice(1, -1)) : foodItem.nutritionInfo
                    }
                    try {
                        foodItem.properties = foodItem.properties && Object.keys(foodItem.properties).length > 0 ? JSON.parse(foodItem.properties.replace(/\\/g, "")) : foodItem.properties
                    } catch (err) {
                        foodItem.properties = foodItem.properties ? JSON.parse(foodItem.properties.replace(/\\/g, "").slice(1, -1)) : foodItem.properties
                    }
                    try {
                        foodItem.printableName = foodItem.printableName && Object.keys(foodItem.printableName).length > 0 ? JSON.parse(foodItem.printableName.replace(/\\/g, "")) : foodItem.printableName
                    } catch (err) {
                        foodItem.printableName = foodItem.printableName ? JSON.parse(foodItem.printableName.replace(/\\/g, "").slice(1, -1)) : foodItem.printableName
                    }

                    return foodItem;

                })
            }
            dispatch(setGetFoodItemsSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetFoodItemsFailure(err));
            dispatch(setError(err));
        });
};

export const fetchFoodItemById = (id) => async dispatch => {
    const url = `admin/food-items/${id}`
    dispatch(setGetFoodItemRequest(true));
    await axios
        .get(url)
        .then(res => {
            if (res.data && res.data.data) {
                try {
                    res.data.data.name = JSON.parse(res.data.data.name.replace(/\\/g, ""))
                    res.data.data.menus && res.data.data.menus.map((m) => {
                        try {
                            m.name = JSON.parse(m.name.replace(/\\/g, ""))
                        } catch (err) {
                            m.name = JSON.parse(m.name.replace(/\\/g, "").slice(1, -1))
                        }
                        return m
                    })
                } catch (error) {
                    res.data.data.name = JSON.parse(res.data.data.name.replace(/\\/g, "").slice(1, -1))
                    res.data.data.menus && res.data.data.menus.map((m) => {
                        try {
                            m.name = JSON.parse(m.name.replace(/\\/g, ""))
                        } catch (err) {
                            m.name = JSON.parse(m.name.replace(/\\/g, "").slice(1, -1))
                        }
                        return m
                    })
                }
            }

            dispatch(setGetFoodItemsuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetFoodItemFailure(err));
            dispatch(setError(err));
        });
};

export const fetchFoodItemByMenuId = (menuid) => async dispatch => {
    const url = `admin/menus/${menuid}/food-items`
    dispatch(setGetMenuFoodItemsRequest(true));
    await axios
        .get(url)
        .then(res => {
            if (res.data && res.data.data) {
                res.data.data.map((foodItem) => {
                    //let foodItemCopy = JSON.parse(JSON.stringify(foodItem))
                    // foodItem.name = JSON.parse(foodItem.name)
                    try {
                        foodItem.name = JSON.parse(foodItem.name.replace(/\\/g, ""))
                    }
                    catch (err) {
                        foodItem.name = foodItem.name ? JSON.parse(foodItem.name.replace(/\\/g, "").slice(1, -1)) : foodItem.name
                    }

                    try {
                        foodItem.allergyInfo = foodItem.allergyInfo && Object.keys(foodItem.allergyInfo).length > 0 ? JSON.parse(foodItem.allergyInfo.replace(/\\/g, "")) : foodItem.allergyInfo
                    } catch (err) {
                        foodItem.allergyInfo = foodItem.allergyInfo ? JSON.parse(foodItem.allergyInfo.replace(/\\/g, "").slice(1, -1)) : foodItem.allergyInfo
                    }
                    try {
                        foodItem.description = foodItem.description && Object.keys(foodItem.description).length > 0 ? JSON.parse(foodItem.description.replace(/\\/g, "")) : foodItem.description
                    } catch (err) {
                        foodItem.description = foodItem.description ? JSON.parse(foodItem.description.replace(/\\/g, "").slice(1, -1)) : foodItem.description
                    }
                    try {
                        foodItem.ingredients = foodItem.ingredients && Object.keys(foodItem.ingredients).length > 0 ? JSON.parse(foodItem.ingredients.replace(/\\/g, "")) : foodItem.ingredients
                    } catch (err) {
                        foodItem.ingredients = foodItem.ingredients ? JSON.parse(foodItem.ingredients.replace(/\\/g, "").slice(1, -1)) : foodItem.ingredients
                    }
                    try {
                        foodItem.nutritionInfo = foodItem.nutritionInfo && Object.keys(foodItem.nutritionInfo).length ? JSON.parse(foodItem.nutritionInfo.replace(/\\/g, "")) : foodItem.nutritionInfo
                    } catch (err) {
                        foodItem.nutritionInfo = foodItem.nutritionInfo ? JSON.parse(foodItem.nutritionInfo.replace(/\\/g, "").slice(1, -1)) : foodItem.nutritionInfo
                    }
                    try {
                        foodItem.properties = foodItem.properties && Object.keys(foodItem.properties).length > 0 ? JSON.parse(foodItem.properties.replace(/\\/g, "")) : foodItem.properties
                    } catch (err) {
                        foodItem.properties = foodItem.properties ? JSON.parse(foodItem.properties.replace(/\\/g, "").slice(1, -1)) : foodItem.properties
                    }

                    try {
                        foodItem.printableName = foodItem.printableName && Object.keys(foodItem.printableName).length > 0 ? JSON.parse(foodItem.printableName.replace(/\\/g, "")) : foodItem.printableName
                    } catch (err) {
                        foodItem.printableName = foodItem.printableName ? JSON.parse(foodItem.printableName.replace(/\\/g, "").slice(1, -1)) : foodItem.printableName
                    }

                    return foodItem;

                })
            }
            dispatch(setGetMenuFoodItemsSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetMenuFoodItemsFailure(err));
            dispatch(setError(err));
        });
};

export const editFoodItem = (data, id) => async dispatch => {
    const url = `admin/food-items/${id}`
    dispatch(setEditFoodItemRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditFoodItemsuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditFoodItemFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const reOrderFoodItem = (sourceId, destinationId) => async dispatch => {
    const url = `admin/food-items/reorder/${sourceId}/${destinationId}`
    dispatch(setEditFoodItemRequest(true));
    await axios
        .patch(url)
        .then(res => {
            dispatch(setEditFoodItemsuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditFoodItemFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const changeFoodItemStatus = (id, isActive) => async dispatch => {
    const url = `admin/food-items/${id}/is-active/${isActive}`
    dispatch(setEditFoodItemRequest(true));
    await axios
        .patch(url)
        .then(res => {
            dispatch(setEditFoodItemsuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditFoodItemFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const addFoodItem = (data) => async dispatch => {
    const url = `admin/food-items`
    dispatch(setAddFoodItemRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddFoodItemsuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddFoodItemFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const deleteFoodItem = (id) => async dispatch => {
    const url = `admin/food-items/${id}`
    dispatch(setDeleteFoodItemRequest(true));
    await axios
        .delete(url)
        .then(res => {
            dispatch(setDeleteFoodItemsuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setDeleteFoodItemFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const updateFoodItemStock = (data, branchId, id) => async dispatch => {
    const url = `admin/branches/${branchId}/food-items/${id}/update-stock`
    dispatch(setEditFoodItemRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditFoodItemsuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditFoodItemFailure(err));
            err.type = "warning"
            err.message = "Food item stock is not available to update!!"
            dispatch(setError(err));
            //return callBack(err);
        });
};
