import axios from '../../utils/axios';

import {
    GET_FOODCATEGORIES_REQUEST,
    GET_FOODCATEGORIES_SUCCESS,
    GET_FOODCATEGORIES_FAILURE,
    GET_FOODCATEGORY_REQUEST,
    GET_FOODCATEGORY_SUCCESS,
    GET_FOODCATEGORY_FAILURE,
    EDIT_FOODCATEGORY_REQUEST,
    EDIT_FOODCATEGORY_SUCCESS,
    EDIT_FOODCATEGORY_FAILURE,
    ADD_FOODCATEGORY_REQUEST,
    ADD_FOODCATEGORY_SUCCESS,
    ADD_FOODCATEGORY_FAILURE,
    DELETE_FOODCATEGORY_REQUEST,
    DELETE_FOODCATEGORY_SUCCESS,
    DELETE_FOODCATEGORY_FAILURE
} from '../../action-types/company/food-category-types';

import { setError } from '../error-actions';

export const setGetFoodCategorisRequest = isLoading => ({
    type: GET_FOODCATEGORIES_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetFoosCategorisSuccess = response => ({
    type: GET_FOODCATEGORIES_SUCCESS,
    payload: {
        foodcategories: response
    }
});

export const setGetFoosCategorisFailure = error => ({
    type: GET_FOODCATEGORIES_FAILURE,
    payload: {
        error
    }
});

export const setGetFoodCategoryRequest = isLoading => ({
    type: GET_FOODCATEGORY_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetFoodCategorySuccess = response => ({
    type: GET_FOODCATEGORY_SUCCESS,
    payload: {
        foodcategory: response
    }
});

export const setGetFoodCategoryFailure = error => ({
    type: GET_FOODCATEGORY_FAILURE,
    payload: {
        error
    }
});


export const setEditFoodCategoryRequest = isLoading => ({
    type: EDIT_FOODCATEGORY_REQUEST,
    payload: {
        isLoading
    }
});

export const setEditFoodCategorySuccess = response => ({
    type: EDIT_FOODCATEGORY_SUCCESS,
    payload: {
        foodcategory: response
    }
});

export const setEditFoodCategoryFailure = error => ({
    type: EDIT_FOODCATEGORY_FAILURE,
    payload: {
        error
    }
});

export const setAddFoodCategoryRequest = isLoading => ({
    type: ADD_FOODCATEGORY_REQUEST,
    payload: {
        isLoading
    }
});

export const setAddFoodCategorySuccess = response => ({
    type: ADD_FOODCATEGORY_SUCCESS,
    payload: {
        foodcategory: response
    }
});

export const setAddFoodCategoryFailure = error => ({
    type: ADD_FOODCATEGORY_FAILURE,
    payload: {
        error
    }
});

export const setDeleteFoodCategoryRequest = isLoading => ({
    type: DELETE_FOODCATEGORY_REQUEST,
    payload: {
        isLoading
    }
});

export const setDeleteFoodCategorySuccess = response => ({
    type: DELETE_FOODCATEGORY_SUCCESS,
    payload: {
        foodcategory: response
    }
});

export const setDeleteFoodCategoryFailure = error => ({
    type: DELETE_FOODCATEGORY_FAILURE,
    payload: {
        error
    }
});

export const fetchBranchFoodCategories = (id) => async dispatch => {
    const url = `admin/branches/${id}/food-categories`
    dispatch(setGetFoodCategorisRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetFoosCategorisSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetFoosCategorisFailure(err));
            dispatch(setError(err));
        });
};

export const fetchCompanyFoodCategories = (id) => async dispatch => {
    const url = `admin/companies/${id}/food-categories`
    dispatch(setGetFoodCategorisRequest(true));
    await axios
        .get(url)
        .then(res => {
            if (res.data && res.data.data) {
                res.data.data.map((foodCat) => {
                    try {
                        foodCat.name = JSON.parse(foodCat.name.replace(/\\/g, ""))
                        foodCat.description = JSON.parse(foodCat.description.replace(/\\/g, ""))
                    } catch (error) {
                        foodCat.name = JSON.parse(foodCat.name.replace(/\\/g, "").slice(1, -1))
                        foodCat.description = JSON.parse(foodCat.description.replace(/\\/g, "").slice(1, -1))
                    }

                    return foodCat;
                })
            }
            dispatch(setGetFoosCategorisSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetFoosCategorisFailure(err));
            dispatch(setError(err));
        });
};

export const fetchFoodCategoryById = (id) => async dispatch => {
    const url = `admin/food-categories/${id}`
    dispatch(setGetFoodCategoryRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetFoodCategorySuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetFoodCategoryFailure(err));
            dispatch(setError(err));
        });
};

export const editFoodCategory = (data, id) => async dispatch => {
    const url = `admin/food-categories/${id}`
    dispatch(setEditFoodCategoryRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditFoodCategorySuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditFoodCategoryFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const changeFoodCategoryStatus = (id, isActive) => async dispatch => {
    const url = `admin/food-categories/${id}/is-active/${isActive}`
    dispatch(setEditFoodCategoryRequest(true));
    await axios
        .patch(url)
        .then(res => {
            dispatch(setEditFoodCategorySuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditFoodCategoryFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};



export const addFoodCategory = (data) => async dispatch => {
    const url = `admin/food-categories`
    dispatch(setAddFoodCategoryRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddFoodCategorySuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddFoodCategoryFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const deleteFoodCategory = (id) => async dispatch => {
    const url = `admin/food-categories/${id}`
    dispatch(setDeleteFoodCategoryRequest(true));
    await axios
        .delete(url)
        .then(res => {
            dispatch(setDeleteFoodCategorySuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setDeleteFoodCategoryFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};
