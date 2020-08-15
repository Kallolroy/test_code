import axios from '../../utils/axios';

import {
    GET_FOOD_ITEM_OPT_SLOTS_REQUEST,
    GET_FOOD_ITEM_OPT_SLOTS_SUCCESS,
    GET_FOOD_ITEM_OPT_SLOTS_FAILURE,
    GET_FOOD_ITEM_OPT_SLOT_REQUEST,
    GET_FOOD_ITEM_OPT_SLOT_SUCCESS,
    GET_FOOD_ITEM_OPT_SLOT_FAILURE,
    EDIT_FOOD_ITEM_OPT_SLOT_REQUEST,
    EDIT_FOOD_ITEM_OPT_SLOT_SUCCESS,
    EDIT_FOOD_ITEM_OPT_SLOT_FAILURE,
    ADD_FOOD_ITEM_OPT_SLOT_REQUEST,
    ADD_FOOD_ITEM_OPT_SLOT_SUCCESS,
    ADD_FOOD_ITEM_OPT_SLOT_FAILURE,
    DELETE_FOOD_ITEM_OPT_SLOT_REQUEST,
    DELETE_FOOD_ITEM_OPT_SLOT_SUCCESS,
    DELETE_FOOD_ITEM_OPT_SLOT_FAILURE
} from '../../action-types/company/food-item-opt-slots-types';

import { setError } from '../error-actions';

export const setGetFood_item_opt_slotsRequest = isLoading => ({
    type: GET_FOOD_ITEM_OPT_SLOTS_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetFood_item_opt_slotsSuccess = response => ({
    type: GET_FOOD_ITEM_OPT_SLOTS_SUCCESS,
    payload: {
        food_item_opt_slots: response
    }
});

export const setGetFood_item_opt_slotsFailure = error => ({
    type: GET_FOOD_ITEM_OPT_SLOTS_FAILURE,
    payload: {
        error
    }
});

export const setGetFood_item_opt_slotRequest = isLoading => ({
    type: GET_FOOD_ITEM_OPT_SLOT_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetFood_item_opt_slotSuccess = response => ({
    type: GET_FOOD_ITEM_OPT_SLOT_SUCCESS,
    payload: {
        food_item_opt_slot: response
    }
});

export const setGetFood_item_opt_slotFailure = error => ({
    type: GET_FOOD_ITEM_OPT_SLOT_FAILURE,
    payload: {
        error
    }
});


export const setEditFood_item_opt_slotRequest = isLoading => ({
    type: EDIT_FOOD_ITEM_OPT_SLOT_REQUEST,
    payload: {
        isLoading
    }
});

export const setEditFood_item_opt_slotSuccess = response => ({
    type: EDIT_FOOD_ITEM_OPT_SLOT_SUCCESS,
    payload: {
        food_item_opt_slot: response
    }
});

export const setEditFood_item_opt_slotFailure = error => ({
    type: EDIT_FOOD_ITEM_OPT_SLOT_FAILURE,
    payload: {
        error
    }
});

export const setAddFood_item_opt_slotRequest = isLoading => ({
    type: ADD_FOOD_ITEM_OPT_SLOT_REQUEST,
    payload: {
        isLoading
    }
});

export const setAddFood_item_opt_slotSuccess = response => ({
    type: ADD_FOOD_ITEM_OPT_SLOT_SUCCESS,
    payload: {
        food_item_opt_slot: response
    }
});

export const setAddFood_item_opt_slotFailure = error => ({
    type: ADD_FOOD_ITEM_OPT_SLOT_FAILURE,
    payload: {
        error
    }
});

export const setDeleteFood_item_opt_slotRequest = isLoading => ({
    type: DELETE_FOOD_ITEM_OPT_SLOT_REQUEST,
    payload: {
        isLoading
    }
});

export const setDeleteFood_item_opt_slotSuccess = response => ({
    type: DELETE_FOOD_ITEM_OPT_SLOT_SUCCESS,
    payload: {
        food_item_opt_slot: response
    }
});

export const setDeleteFood_item_opt_slotFailure = error => ({
    type: DELETE_FOOD_ITEM_OPT_SLOT_FAILURE,
    payload: {
        error
    }
});

export const fetchFoodItemOptSlots = (id) => async dispatch => {
    const url = `admin/menus/${id}/food-items`
    dispatch(setGetFood_item_opt_slotsRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetFood_item_opt_slotsSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetFood_item_opt_slotsFailure(err));
            dispatch(setError(err));
        });
};

export const fetchFoodItemOptSlotById = async (menuId, foodItemId) => {
    let foodItemOptSlote = null
    const url = `admin/food-item-opt-slots/${menuId}/${foodItemId}`
    await axios
        .get(url)
        .then(res => {
            foodItemOptSlote = res.data
        })
        .catch(err => {
            console.log(err)
        });
    return foodItemOptSlote;
};

export const editFoodItemOptSlot = (data) => async dispatch => {
    const url = `admin/food-item-opt-slots/${data[0].menuId}/${data[0].foodItemId}`
    let response = [];
    dispatch(setEditFood_item_opt_slotRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditFood_item_opt_slotSuccess(res.data));
            response = res
        })
        .catch(err => {
            dispatch(setEditFood_item_opt_slotFailure(err));
            dispatch(setError(err));
            response = err
        });
    return response
};

export const changeFoodItemOptSlotStatus = (menuId, foodItemId, optSlotIds, isActive) => async dispatch => {
    const url = `admin/food-item-opt-slots/menus/${menuId}/food-items/${foodItemId}/is-active/${isActive}`
    let response = [];
    dispatch(setEditFood_item_opt_slotRequest(true));
    await axios
        .patch(url, optSlotIds)
        .then(res => {
            dispatch(setEditFood_item_opt_slotSuccess(res.data));
            response = res
        })
        .catch(err => {
            dispatch(setEditFood_item_opt_slotFailure(err));
            dispatch(setError(err));
            response = err
        });
    return response
};

export const addFoodItemOptSlot = (data) => async dispatch => {
    const url = `admin/food-item-opt-slots`
    let response = [];
    dispatch(setAddFood_item_opt_slotRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddFood_item_opt_slotSuccess(res.data));
            response = res
        })
        .catch(err => {
            dispatch(setAddFood_item_opt_slotFailure(err));
            dispatch(setError(err));
            response = err
        });

    return response
};

export const deleteFoodItemOptSlot = (menuId, foodItemId) => async dispatch => {
    const url = `admin/food-item-opt-slots/${menuId}/${foodItemId}`
    let response = [];
    dispatch(setDeleteFood_item_opt_slotRequest(true));
    await axios
        .delete(url)
        .then(res => {
            dispatch(setDeleteFood_item_opt_slotSuccess(res.data));
            response = res
        })
        .catch(err => {
            dispatch(setDeleteFood_item_opt_slotFailure(err));
            dispatch(setError(err));
            response = err
        });
    return response
};

