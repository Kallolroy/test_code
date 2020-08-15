import axios from '../../utils/axios';

import {
  GET_RECEIPT_TEMPLATE_REQUEST,
  GET_RECEIPT_TEMPLATE_SUCCESS,
  GET_RECEIPT_TEMPLATE_FAILURE,
  ADD_RECEIPT_TEMPLATE_REQUEST,
  ADD_RECEIPT_TEMPLATE_SUCCESS,
  ADD_RECEIPT_TEMPLATE_FAILURE,
  EDIT_RECEIPT_TEMPLATE_REQUEST,
  EDIT_RECEIPT_TEMPLATE_SUCCESS,
  EDIT_RECEIPT_TEMPLATE_FAILURE,
  SET_RECEIPT_TEMPLATE_FORM_DATA,
} from '../../action-types/receipt-template-types';

import { setError } from '../error-actions';
const adminUrl = 'admin';

export const setGetReceiptTemplateRequest = (isLoading) => ({
  type: GET_RECEIPT_TEMPLATE_REQUEST,
  payload: {
    isLoading,
  },
});

export const setGetReceiptTemplateSuccess = (response) => ({
  type: GET_RECEIPT_TEMPLATE_SUCCESS,
  payload: {
    ReceiptTemplate: response,
  },
});

export const setGetReceiptTemplateFailure = (error) => ({
  type: GET_RECEIPT_TEMPLATE_FAILURE,
  payload: {
    error,
  },
});

export const setEditReceiptTemplateRequest = (isLoading) => ({
  type: EDIT_RECEIPT_TEMPLATE_REQUEST,
  payload: {
    isLoading,
  },
});

export const setEditReceiptTemplateSuccess = (response) => ({
  type: EDIT_RECEIPT_TEMPLATE_SUCCESS,
  payload: {
    receiptTemplate: response,
  },
});

export const setEditReceiptTemplateFailure = (error) => ({
  type: EDIT_RECEIPT_TEMPLATE_FAILURE,
  payload: {
    error,
  },
});

export const setAddReceiptTemplateRequest = (isLoading) => ({
  type: ADD_RECEIPT_TEMPLATE_REQUEST,
  payload: {
    isLoading,
  },
});

export const setAddReceiptTemplateSuccess = (response) => ({
  type: ADD_RECEIPT_TEMPLATE_SUCCESS,
  payload: {
    ReceiptTemplate: response,
  },
});

export const setAddReceiptTemplateFailure = (error) => ({
  type: ADD_RECEIPT_TEMPLATE_FAILURE,
  payload: {
    error,
  },
});

// Get ReceiptTemplate
export const fetchReceiptTemplate = (companyId, branchId) => async (
  dispatch
) => {
  const url = `${adminUrl}/companies/${companyId}/branches/${branchId}/receipts`;
  dispatch(setGetReceiptTemplateRequest(true));
  let response = null;

  await axios
    .get(url)
    .then((res) => {
      if (res.data.data) {
        try {
          res.data.data.footerText = JSON.parse(
            res.data.data.footerText.replace(/\\/g, '')
          );
        } catch (error) {
          res.data.data.footerText = JSON.parse(
            res.data.data.footerText.replace(/\\/g, '').slice(1, -1)
          );
        }
        try {
          res.data.data.headerText = JSON.parse(
            res.data.data.headerText.replace(/\\/g, '')
          );
        } catch (error) {
          res.data.data.headerText = JSON.parse(
            res.data.data.headerText.replace(/\\/g, '').slice(1, -1)
          );
        }
      }

      dispatch(setGetReceiptTemplateSuccess(res.data.data));
      response = res.data.data;
    })
    .catch((err) => {
      dispatch(setGetReceiptTemplateFailure(err));
      dispatch(setError(err));
      response = err;
    });
  return response;
};

export const editReceiptTemplate = (
  data,
  companyId = null,
  branchId = null,
  id = null
) => async (dispatch) => {
  const url = `${adminUrl}/companies/${companyId}/branches/${branchId}/receipts/${id}`;

  dispatch(setEditReceiptTemplateRequest(true));
  await axios
    .patch(url, data)
    .then((res) => {
      if (res.data && res.data.data) {
        res.data.data.map((receipt) => {
          //let foodItemCopy = JSON.parse(JSON.stringify(foodItem))
          receipt.footerText = JSON.parse(receipt.footerText);
          receipt.headerText = JSON.parse(receipt.headerText);
          return receipt;
        });
      }
      dispatch(setEditReceiptTemplateSuccess(res.data.data));
      //return callBack(null, res);
    })
    .catch((err) => {
      dispatch(setEditReceiptTemplateFailure(err));
      dispatch(setError(err));
      //return callBack(err);
    });
};

export const addReceiptTemplate = (
  data,
  companyId = null,
  branchId = null
) => async (dispatch) => {
  const url = `${adminUrl}/companies/${companyId}/branches/${branchId}/receipts`;
  dispatch(setAddReceiptTemplateRequest(true));
  await axios
    .post(url, data)
    .then((res) => {
      dispatch(setAddReceiptTemplateSuccess(res.data));
      //return callBack(null, res);
    })
    .catch((err) => {
      dispatch(setAddReceiptTemplateFailure(err));
      dispatch(setError(err));
      //return callBack(err);
    });
};
