import axios from '../../utils/axios';

import {
  GET_KITCHENS_REQUEST,
  GET_KITCHENS_SUCCESS,
  GET_KITCHENS_FAILURE,
  GET_KITCHEN_REQUEST,
  GET_KITCHEN_SUCCESS,
  GET_KITCHEN_FAILURE,
  EDIT_KITCHEN_REQUEST,
  EDIT_KITCHEN_SUCCESS,
  EDIT_KITCHEN_FAILURE,
  ADD_KITCHEN_REQUEST,
  ADD_KITCHEN_SUCCESS,
  ADD_KITCHEN_FAILURE,
  DELETE_KITCHEN_REQUEST,
  DELETE_KITCHEN_SUCCESS,
  DELETE_KITCHEN_FAILURE,
} from '../../action-types/company/kitchen-types';

import { setError } from '../error-actions';

export const setGetKitchensRequest = (isLoading) => ({
  type: GET_KITCHENS_REQUEST,
  payload: {
    isLoading,
  },
});

export const setGetKitchensSuccess = (response) => ({
  type: GET_KITCHENS_SUCCESS,
  payload: {
    kitchens: response,
  },
});

export const setGetKitchensFailure = (error) => ({
  type: GET_KITCHENS_FAILURE,
  payload: {
    error,
  },
});

export const setGetKitchenRequest = (isLoading) => ({
  type: GET_KITCHEN_REQUEST,
  payload: {
    isLoading,
  },
});

export const setGetKitchenSuccess = (response) => ({
  type: GET_KITCHEN_SUCCESS,
  payload: {
    kitchen: response,
  },
});

export const setGetKitchenFailure = (error) => ({
  type: GET_KITCHEN_FAILURE,
  payload: {
    error,
  },
});

export const setEditKitchenRequest = (isLoading) => ({
  type: EDIT_KITCHEN_REQUEST,
  payload: {
    isLoading,
  },
});

export const setEditKitchenSuccess = (response) => ({
  type: EDIT_KITCHEN_SUCCESS,
  payload: {
    kitchen: response,
  },
});

export const setEditKitchenFailure = (error) => ({
  type: EDIT_KITCHEN_FAILURE,
  payload: {
    error,
  },
});

export const setAddKitchenRequest = (isLoading) => ({
  type: ADD_KITCHEN_REQUEST,
  payload: {
    isLoading,
  },
});

export const setAddKitchenSuccess = (response) => ({
  type: ADD_KITCHEN_SUCCESS,
  payload: {
    kitchen: response,
  },
});

export const setAddKitchenFailure = (error) => ({
  type: ADD_KITCHEN_FAILURE,
  payload: {
    error,
  },
});

export const setDeleteKitchenRequest = (isLoading) => ({
  type: ADD_KITCHEN_REQUEST,
  payload: {
    isLoading,
  },
});

export const setDeleteKitchenSuccess = (response) => ({
  type: ADD_KITCHEN_SUCCESS,
  payload: {
    kitchen: response,
  },
});

export const setDeleteKitchenFailure = (error) => ({
  type: ADD_KITCHEN_FAILURE,
  payload: {
    error,
  },
});

export const fetchBranchKitchens = (id) => async (dispatch) => {
  const url = `/admin/branches/${id}/kitchens`;
  dispatch(setGetKitchensRequest(true));
  await axios
    .get(url)
    .then((res) => {
      dispatch(setGetKitchensSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setGetKitchensFailure(err));
      dispatch(setError(err));
    });
};

export const fetchCompanyKitchens = (id) => async (dispatch) => {
  const url = `/admin/companies/${id}/kitchens`;
  dispatch(setGetKitchensRequest(true));
  await axios
    .get(url)
    .then((res) => {
      dispatch(setGetKitchensSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setGetKitchensFailure(err));
      dispatch(setError(err));
    });
};

export const fetchKitchenById = (id) => async (dispatch) => {
  const url = `/admin/kitchens/${id}`;
  dispatch(setGetKitchenRequest(true));
  await axios
    .get(url)
    .then((res) => {
      dispatch(setGetKitchenSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setGetKitchenFailure(err));
      dispatch(setError(err));
    });
};

export const editKitchen = (data) => async (dispatch) => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let response = [];
  const url = `/admin/kitchens/${data.id}`;
  dispatch(setEditKitchenRequest(true));
  await axios
    .patch(url, data)
    .then((res) => {
      dispatch(setEditKitchenSuccess(res.data));
      //return callBack(null, res);
      response = res;
    })
    .catch((err) => {
      dispatch(setEditKitchenFailure(err));
      dispatch(setError(err));
      //return callBack(err);
      response = err;
    });
  return response;
};

export const addKitchen = (data) => async (dispatch) => {
  const url = `/admin/kitchens`;
  dispatch(setAddKitchenRequest(true));
  await axios
    .post(url, data)
    .then((res) => {
      dispatch(setAddKitchenSuccess(res.data));
      //return callBack(null, res);
    })
    .catch((err) => {
      dispatch(setAddKitchenFailure(err));
      dispatch(setError(err));
      //return callBack(err);
    });
};

export const deleteKitchen = (id) => async (dispatch) => {
  const url = `/admin/kitchens/${id}`;
  dispatch(setAddKitchenRequest(true));
  await axios
    .delete(url)
    .then((res) => {
      dispatch(setAddKitchenSuccess(res.data));
      //return callBack(null, res);
    })
    .catch((err) => {
      dispatch(setAddKitchenFailure(err));
      dispatch(setError(err));
      //return callBack(err);
    });
};
