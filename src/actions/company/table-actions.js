import axios from '../../utils/axios';

import {
  GET_TABLES_REQUEST,
  GET_TABLES_SUCCESS,
  GET_TABLES_FAILURE,
  GET_SECTIONS_REQUEST,
  GET_SECTIONS_SUCCESS,
  GET_SECTIONS_FAILURE,
  GET_TABLE_REQUEST,
  GET_TABLE_SUCCESS,
  GET_TABLE_FAILURE,
  EDIT_TABLE_REQUEST,
  EDIT_TABLE_SUCCESS,
  EDIT_TABLE_FAILURE,
  ADD_TABLE_REQUEST,
  ADD_TABLE_SUCCESS,
  ADD_TABLE_FAILURE,
  ADD_GENERATED_TABLE_CODE,
  DELETE_TABLE_REQUEST,
  DELETE_TABLE_SUCCESS,
  DELETE_TABLE_FAILURE,
} from '../../action-types/company/table-types';

import { setError } from '../error-actions';

export const setGetTablesRequest = (isLoading) => ({
  type: GET_TABLES_REQUEST,
  payload: {
    isLoading,
  },
});

export const setGetTablesSuccess = (response) => ({
  type: GET_TABLES_SUCCESS,
  payload: {
    tables: response,
  },
});

export const setGetTablesFailure = (error) => ({
  type: GET_TABLES_FAILURE,
  payload: {
    error,
  },
});

export const setGetSectionsSuccess = (response) => ({
  type: GET_SECTIONS_SUCCESS,
  payload: {
    sections: response,
  },
});

export const setGetSectionsRequest = (isLoading) => ({
  type: GET_SECTIONS_REQUEST,
  payload: {
    isLoading,
  },
});

export const setGetSectionsFailure = (error) => ({
  type: GET_SECTIONS_FAILURE,
  payload: {
    error,
  },
});

export const setGetTableRequest = (isLoading) => ({
  type: GET_TABLE_REQUEST,
  payload: {
    isLoading,
  },
});

export const setGetTableSuccess = (response) => ({
  type: GET_TABLE_SUCCESS,
  payload: {
    table: response,
  },
});

export const setGetTableFailure = (error) => ({
  type: GET_TABLE_FAILURE,
  payload: {
    error,
  },
});

export const setEditTableRequest = (isLoading) => ({
  type: EDIT_TABLE_REQUEST,
  payload: {
    isLoading,
  },
});

export const setEditTableSuccess = (response) => ({
  type: EDIT_TABLE_SUCCESS,
  payload: {
    table: response,
  },
});

export const setEditTableFailure = (error) => ({
  type: EDIT_TABLE_FAILURE,
  payload: {
    error,
  },
});

export const setAddTableRequest = (isLoading) => ({
  type: ADD_TABLE_REQUEST,
  payload: {
    isLoading,
  },
});

export const setAddTableSuccess = (response) => ({
  type: ADD_TABLE_SUCCESS,
  payload: {
    table: response,
  },
});

export const setAddTableFailure = (error) => ({
  type: ADD_TABLE_FAILURE,
  payload: {
    error,
  },
});

export const setGeneratedTableCode = (code) => ({
  type: ADD_GENERATED_TABLE_CODE,
  payload: {
    code,
  },
});

export const fetchBranchTables = (id) => async (dispatch) => {
  const url = `admin/branches/${id}/restaurant-tables`;
  dispatch(setGetTablesRequest(true));
  await axios
    .get(url)
    .then((res) => {
      dispatch(setGetTablesSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setGetTablesFailure(err));
      err.source = "Restaurant Table"
      dispatch(setError(err));
    });
};

export const fetchBranchSections = async (companyId, branchId) => {
  var sectionsData = null;
  const url = `admin/companies/${companyId}/branches/${branchId}/sections`;
  await axios
    .get(url)
    .then((res) => {
      sectionsData = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return sectionsData;
};

export const fetchCompanyTables = (id) => async (dispatch) => {
  const url = `admin/companies/${id}/restaurant-tables`;
  dispatch(setGetTablesRequest(true));
  await axios
    .get(url)
    .then((res) => {
      dispatch(setGetTablesSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setGetTablesFailure(err));
      dispatch(setError(err));
    });
};

export const fetchTableById = (id) => async (dispatch) => {
  const url = `restauranttables/${id}`;
  dispatch(setGetTableRequest(true));
  await axios
    .get(url)
    .then((res) => {
      dispatch(setGetTableSuccess(res.data));
    })
    .catch((err) => {
      dispatch(setGetTableFailure(err));
      dispatch(setError(err));
    });
};

export const editTable = (data) => async (dispatch) => {
  const url = `admin/restaurant-tables/${data.id}`;
  dispatch(setEditTableRequest(true));
  await axios
    .patch(url, data)
    .then((res) => {
      dispatch(setEditTableSuccess(res.data));
      //return callBack(null, res);
    })
    .catch((err) => {
      dispatch(setEditTableFailure(err));
      dispatch(setError(err));
      //return callBack(err);
    });
};

export const addTable = (data) => async (dispatch) => {
  const url = `admin/restaurant-tables`;
  dispatch(setAddTableRequest(true));
  await axios
    .post(url, data)
    .then((res) => {
      dispatch(setAddTableSuccess(res.data));
      //return callBack(null, res);
    })
    .catch((err) => {
      dispatch(setAddTableFailure(err));
      dispatch(setError(err));
      //return callBack(err);
    });
};

export const deleteTable = (id) => async (dispatch) => {
  const url = `/admin/restaurant-tables/${id}`;
  dispatch(setAddTableRequest(true));
  await axios
    .delete(url)
    .then((res) => {
      dispatch(setAddTableSuccess(res.data));
      //return callBack(null, res);
    })
    .catch((err) => {
      dispatch(setAddTableFailure(err));
      dispatch(setError(err));
      //return callBack(err);
    });
};
