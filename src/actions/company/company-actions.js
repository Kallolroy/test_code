import axios from '../../utils/axios';

import {
  GET_COMPANIES_REQUEST,
  GET_COMPANIES_SUCCESS,
  GET_COMPANIES_FAILURE,
  GET_COMPANY_REQUEST,
  GET_COMPANY_SUCCESS,
  GET_COMPANY_FAILURE,
  GET_COMPANY_BRANCHES_REQUEST,
  GET_COMPANY_BRANCHES_SUCCESS,
  GET_COMPANY_BRANCHES_FAILURE,
  EDIT_COMPANY_REQUEST,
  EDIT_COMPANY_SUCCESS,
  EDIT_COMPANY_FAILURE,
  ADD_COMPANY_REQUEST,
  ADD_COMPANY_SUCCESS,
  ADD_COMPANY_FAILURE,
  DELETE_COMPANY_REQUEST,
  DELETE_COMPANY_SUCCESS,
  DELETE_COMPANY_FAILURE,
} from '../../action-types/company/company-types';

import {
  GET_LANGUAGE_REQUEST,
  GET_LANGUAGE_SUCCESS,
  GET_LANGUAGE_FAILURE,
} from '../../action-types/company/company-setting-types';

import { setError } from '../error-actions';

export const setGetCompaniesRequest = (isLoading) => ({
  type: GET_COMPANIES_REQUEST,
  payload: {
    isLoading,
  },
});

export const setGetLanguageRequest = (isLoading) => ({
  type: GET_LANGUAGE_REQUEST,
  payload: {
    isLoading,
  },
});

export const setGetLanguageSuccess = (response) => ({
  type: GET_LANGUAGE_SUCCESS,
  payload: {
    language: response,
  },
});

export const setGetCompaniesSuccess = (response) => ({
  type: GET_COMPANIES_SUCCESS,
  payload: {
    companies: response,
  },
});

export const setGetCompaniesFailure = (error) => ({
  type: GET_COMPANIES_FAILURE,
  payload: {
    error,
  },
});

export const setGetLanguageFailure = (error) => ({
  type: GET_LANGUAGE_FAILURE,
  payload: {
    error,
  },
});

export const setGetCompanyRequest = (isLoading) => ({
  type: GET_COMPANY_REQUEST,
  payload: {
    isLoading,
  },
});

export const setGetCompanySuccess = (response) => ({
  type: GET_COMPANY_SUCCESS,
  payload: {
    userCompany: response,
  },
});

export const setGetCompanyFailure = (error) => ({
  type: GET_COMPANY_FAILURE,
  payload: {
    error,
  },
});

export const setGetCompanyBranchesRequest = (isLoading) => ({
  type: GET_COMPANY_BRANCHES_REQUEST,
  payload: {
    isLoading,
  },
});

export const setGetCompanyBranchesSuccess = (response) => ({
  type: GET_COMPANY_BRANCHES_SUCCESS,
  payload: {
    branches: response,
  },
});

export const setGetCompanyBranchesFailure = (error) => ({
  type: GET_COMPANY_BRANCHES_FAILURE,
  payload: {
    error,
  },
});

export const setEditCompanyRequest = (isLoading) => ({
  type: EDIT_COMPANY_REQUEST,
  payload: {
    isLoading,
  },
});

export const setEditCompanySuccess = (response) => ({
  type: EDIT_COMPANY_SUCCESS,
  payload: {
    userCompany: response,
  },
});

export const setEditCompanyFailure = (error) => ({
  type: EDIT_COMPANY_FAILURE,
  payload: {
    error,
  },
});

export const setAddCompanyRequest = (isLoading) => ({
  type: ADD_COMPANY_REQUEST,
  payload: {
    isLoading,
  },
});

export const setAddCompanySuccess = (response) => ({
  type: ADD_COMPANY_SUCCESS,
  payload: {
    userCompany: response,
  },
});

export const setAddCompanyFailure = (error) => ({
  type: ADD_COMPANY_FAILURE,
  payload: {
    error,
  },
});

export const setDeleteCompanyRequest = (isLoading) => ({
  type: DELETE_COMPANY_REQUEST,
  payload: {
    isLoading,
  },
});

export const setDeleteCompanySuccess = (response) => ({
  type: DELETE_COMPANY_SUCCESS,
  payload: {
    response: response,
  },
});

export const setDeleteCompanyFailure = (error) => ({
  type: DELETE_COMPANY_FAILURE,
  payload: {
    error,
  },
});

export const fetchCompanies = () => (dispatch) => {
  dispatch(setGetCompaniesRequest(true));
  axios
    .get('/admin/companies')
    .then((res) => {
      dispatch(setGetCompaniesSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setGetCompaniesFailure(err));
      dispatch(setError(err));
    });
};

export const fetchLanguage = () => async (dispatch) => {
  let response = [];
  dispatch(setGetLanguageRequest(true));
  await axios
    .get('/common/languages')
    .then((res) => {
      dispatch(setGetLanguageSuccess(res.data));
      response = res.data;
    })
    .catch((err) => {
      dispatch(setGetLanguageFailure(err));
      dispatch(setError(err));
      response = err.response;
    });
  return response;
};

export const fetchCompanyById = (id) => async (dispatch) => {
  const url = `/admin/companies/${id}`;
  dispatch(setGetCompanyRequest(true));
  await axios
    .get(url)
    .then((res) => {
      dispatch(setGetCompanySuccess(res.data));
    })
    .catch((err) => {
      dispatch(setGetCompanyFailure(err));
      dispatch(setError(err));
    });
};

export const fetchCompanyBranches = (id) => async (dispatch) => {
  const url = `/admin/companies/${id}/branches`;
  dispatch(setGetCompanyBranchesRequest(true));
  await axios
    .get(url)
    .then((res) => {
      dispatch(setGetCompanyBranchesSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setGetCompanyBranchesFailure(err));
      dispatch(setError(err));
    });
};

export const editCompany = (data, id) => async (dispatch) => {
  const url = `/admin/companies/${id}`;
  dispatch(setEditCompanyRequest(true));
  await axios
    .patch(url, data)
    .then((res) => {
      dispatch(setEditCompanySuccess(res.data));
      //return callBack(null, res);
    })
    .catch((err) => {
      dispatch(setEditCompanyFailure(err));
      dispatch(setError(err));
      //return callBack(err);
    });
};

export const addCompany = (data) => async (dispatch) => {
  const url = `/admin/companies`;
  dispatch(setAddCompanyRequest(true));
  await axios
    .post(url, data)
    .then((res) => {
      dispatch(setAddCompanySuccess(res.data));
      //return callBack(null, res);
    })
    .catch((err) => {
      dispatch(setAddCompanyFailure(err));
      dispatch(setError(err));
      //return callBack(err);
    });
};

export const deleteCompany = (id) => async (dispatch) => {
  const url = `/admin/companies/${id}`;
  dispatch(setDeleteCompanyRequest(true));
  try {
    const res = await axios.delete(url);
    dispatch(setDeleteCompanySuccess(res.data));
  } catch (err) {
    dispatch(setDeleteCompanyFailure(err));
    dispatch(setError(err));
  }
};
