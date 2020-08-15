import axios from '../../utils/axios';

import {
  GET_PAYMENTMETHODS_REQUEST,
  GET_PAYMENTMETHODS_SUCCESS,
  GET_PAYMENTMETHODS_FAILURE,
  GET_PAYMENTMETHOD_REQUEST,
  GET_PAYMENTMETHOD_SUCCESS,
  GET_PAYMENTMETHOD_FAILURE,
  EDIT_PAYMENTMETHOD_REQUEST,
  EDIT_PAYMENTMETHOD_SUCCESS,
  EDIT_PAYMENTMETHOD_FAILURE,
  ADD_PAYMENTMETHOD_REQUEST,
  ADD_PAYMENTMETHOD_SUCCESS,
  ADD_PAYMENTMETHOD_FAILURE,
  ADD_PAYMENTMETHODS_SUCCESS,
  ADD_PAYMENTMETHODS_FAILURE,
} from '../../action-types/company/payment-method-types';

import { setError } from '../error-actions';

export const setGetPaymentMethodsRequest = (isLoading) => ({
  type: GET_PAYMENTMETHODS_REQUEST,
  payload: {
    isLoading,
  },
});

export const setGetPaymentMethodsSuccess = (response) => ({
  type: GET_PAYMENTMETHODS_SUCCESS,
  payload: {
    paymentmethods: response,
  },
});

export const setGetPaymentMethodsFailure = (error) => ({
  type: GET_PAYMENTMETHODS_FAILURE,
  payload: {
    error,
  },
});

export const setGetPaymentMethodRequest = (isLoading) => ({
  type: GET_PAYMENTMETHOD_REQUEST,
  payload: {
    isLoading,
  },
});

export const setGetPaymentMethodSuccess = (response) => ({
  type: GET_PAYMENTMETHOD_SUCCESS,
  payload: {
    paymentmethod: response,
  },
});

export const setGetPaymentMethodFailure = (error) => ({
  type: GET_PAYMENTMETHOD_FAILURE,
  payload: {
    error,
  },
});

export const setEditPaymentMethodRequest = (isLoading) => ({
  type: EDIT_PAYMENTMETHOD_REQUEST,
  payload: {
    isLoading,
  },
});

export const setEditPaymentMethodSuccess = (response) => ({
  type: EDIT_PAYMENTMETHOD_SUCCESS,
  payload: {
    paymentmethod: response,
  },
});

export const setEditPaymentMethodFailure = (error) => ({
  type: EDIT_PAYMENTMETHOD_FAILURE,
  payload: {
    error,
  },
});

export const setAddPaymentMethodRequest = (isLoading) => ({
  type: ADD_PAYMENTMETHOD_REQUEST,
  payload: {
    isLoading,
  },
});

export const setPaymentMethodSuccess = (response) => ({
  type: ADD_PAYMENTMETHODS_SUCCESS,
  payload: {
    paymentmethod: response,
  },
});

export const setPaymentMethodFailure = (error) => ({
  type: ADD_PAYMENTMETHODS_FAILURE,
  payload: {
    error,
  },
});

export const setAddPaymentMethodSuccess = (response) => ({
  type: ADD_PAYMENTMETHOD_SUCCESS,
  payload: {
    allPaymentMethods: response,
  },
});

export const setAddPaymentMethodFailure = (error) => ({
  type: ADD_PAYMENTMETHOD_FAILURE,
  payload: {
    error,
  },
});

export const fetchCompanyPaymentConfigs = (id) => async (dispatch) => {
  let response = [];
  const url = `/admin/companies/${id}/payment-configs`;
  dispatch(setGetPaymentMethodsRequest(true));
  await axios
    .get(url)
    .then((res) => {
      let merchantKey;
      if (res.data && res.data.data && res.data.data.companyPaymentConfigs) {
        res.data.data.companyPaymentConfigs.map((config) => {
          try {
            config.paymentMethodConfig = JSON.parse(config.paymentMethodConfig);
            config.paymentMethodConfig = JSON.parse(config.paymentMethodConfig);
          } catch (error) {
            try {
              config.paymentMethodConfig = JSON.parse(
                config.paymentMethodConfig.replace(/\\/g, '').slice(1, -1)
              );
            } catch (err) {
              return config;
            }
          }
          return config;
        });
      }

      dispatch(setGetPaymentMethodsSuccess(res.data));
      //response = res;
    })
    .catch((err) => {
      dispatch(setGetPaymentMethodsFailure(err));
      dispatch(setError(err));
      //response = err.response;
    });
  //return response;
};

export const fetchPaymentMethodById = (companyId, id) => async (dispatch) => {
  const url = `/admin/companies/${companyId}/payment-configs/${id}`;
  dispatch(setGetPaymentMethodRequest(true));
  await axios
    .get(url)
    .then((res) => {
      dispatch(setGetPaymentMethodSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setGetPaymentMethodFailure(err));
      dispatch(setError(err));
    });
};

export const editPaymentMethod = (data, companyId) => async (dispatch) => {
  let response = null
  const url = `/admin/companies/${companyId}/payment-configs`;
  dispatch(setEditPaymentMethodRequest(true));
  await axios
    .patch(url, data)
    .then((res) => {
      dispatch(setEditPaymentMethodSuccess(res.data));
      response = res.data
    })
    .catch((err) => {
      dispatch(setEditPaymentMethodFailure(err));
      dispatch(setError(err));
      response = err.response
    });
  return response
};

export const getPaymentMethods = () => async (dispatch) => {
  let data = [];
  const url = `/admin/payment-methods`;
  await axios
    .get(url)
    .then((res) => {
      data = res;
      dispatch(setPaymentMethodSuccess(res.data));
      //return callBack(null, res);
    })
    .catch((err) => {
      data = err.response;
      dispatch(setPaymentMethodFailure(err));
      dispatch(setError(err));
      //return callBack(err);
    });

  return data;
};

export const addPaymentMethod = (data, companyId) => async (dispatch) => {
  let response = [];
  const url = `/admin/companies/${companyId}/payment-configs`;
  dispatch(setAddPaymentMethodRequest(true));
  await axios
    .post(url, data)
    .then((res) => {
      dispatch(setAddPaymentMethodSuccess(res.data));
      //return callBack(null, res);
      response = res.data;
    })
    .catch((err) => {
      dispatch(setAddPaymentMethodFailure(err));
      dispatch(setError(err));
      //return callBack(err);
      response = err.response;
    });
  return response;
};
