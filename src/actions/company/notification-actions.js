import axios from '../../utils/axios';

import {
    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,
    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_NOTIFICATION_FAILURE,
    EDIT_NOTIFICATION_REQUEST,
    EDIT_NOTIFICATION_SUCCESS,
    EDIT_NOTIFICATION_FAILURE,
    ADD_NOTIFICATION_REQUEST,
    ADD_NOTIFICATION_SUCCESS,
    ADD_NOTIFICATION_FAILURE,
    DELETE_NOTIFICATION_REQUEST,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAILURE
} from '../../action-types/company/notification-types';

import { setError } from '../error-actions';

export const setGetNotificationsRequest = isLoading => ({
    type: GET_NOTIFICATIONS_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetNotificationsSuccess = response => ({
    type: GET_NOTIFICATIONS_SUCCESS,
    payload: {
        notifications: response
    }
});

export const setGetNotificationsFailure = error => ({
    type: GET_NOTIFICATIONS_FAILURE,
    payload: {
        error
    }
});

export const setGetNotificationRequest = isLoading => ({
    type: GET_NOTIFICATION_REQUEST,
    payload: {
        isLoading
    }
});

export const setGetNotificationSuccess = response => ({
    type: GET_NOTIFICATION_SUCCESS,
    payload: {
        notification: response
    }
});

export const setGetNotificationFailure = error => ({
    type: GET_NOTIFICATION_FAILURE,
    payload: {
        error
    }
});


export const setEditNotificationRequest = isLoading => ({
    type: EDIT_NOTIFICATION_REQUEST,
    payload: {
        isLoading
    }
});

export const setEditNotificationSuccess = response => ({
    type: EDIT_NOTIFICATION_SUCCESS,
    payload: {
        notification: response
    }
});

export const setEditNotificationFailure = error => ({
    type: EDIT_NOTIFICATION_FAILURE,
    payload: {
        error
    }
});

export const setAddNotificationRequest = isLoading => ({
    type: ADD_NOTIFICATION_REQUEST,
    payload: {
        isLoading
    }
});

export const setAddNotificationSuccess = response => ({
    type: ADD_NOTIFICATION_SUCCESS,
    payload: {
        notification: response
    }
});

export const setAddNotificationFailure = error => ({
    type: ADD_NOTIFICATION_FAILURE,
    payload: {
        error
    }
});

export const setDeleteNotificationRequest = isLoading => ({
    type: DELETE_NOTIFICATION_REQUEST,
    payload: {
        isLoading
    }
});

export const setDeleteNotificationSuccess = response => ({
    type: DELETE_NOTIFICATION_SUCCESS,
    payload: {
        response: response
    }
});

export const setDeleteNotificationFailure = error => ({
    type: DELETE_NOTIFICATION_FAILURE,
    payload: {
        error
    }
});

export const fetchNotifications = () => async dispatch => {
    dispatch(setGetNotificationsRequest(true));
    await axios
        .get('/admin/notifications')
        .then(res => {
            dispatch(setGetNotificationsSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetNotificationsFailure(err));
            dispatch(setError(err));
        });
};

export const fetchNotificationById = (id) => async dispatch => {
    const url = `/admin/notifications/${id}`
    dispatch(setGetNotificationRequest(true));
    await axios
        .get(url)
        .then(res => {
            dispatch(setGetNotificationSuccess(res.data));
        })
        .catch(err => {
            dispatch(setGetNotificationFailure(err));
            dispatch(setError(err));
        });
};


export const editNotification = (data) => async dispatch => {
    const url = `/admin/notifications/${data.id}`
    dispatch(setEditNotificationRequest(true));
    await axios
        .patch(url, data)
        .then(res => {
            dispatch(setEditNotificationSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setEditNotificationFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const addNotification = (data) => async dispatch => {
    const url = `/admin/notifications`
    dispatch(setAddNotificationRequest(true));
    await axios
        .post(url, data)
        .then(res => {
            dispatch(setAddNotificationSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setAddNotificationFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};

export const deleteNotification = (id) => async dispatch => {
    const url = `/admin/notifications/${id}`;
    dispatch(setDeleteNotificationRequest(true));
    await axios
        .delete(url)
        .then(res => {
            dispatch(setDeleteNotificationSuccess(res.data));
            //return callBack(null, res);
        })
        .catch(err => {
            dispatch(setDeleteNotificationFailure(err));
            dispatch(setError(err));
            //return callBack(err);
        });
};