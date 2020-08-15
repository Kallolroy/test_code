import axios from "./../utils/axios";
import { setError } from './../actions/error-actions';

export const validateUser = async (data) => {
    var sessionData = null;
    await axios.post('/auth/sessions', data)
        .then(res => {
            res.data !== "" && res.data.token !== "" && (sessionData = res.data)
        }).catch(err => {
            console.log(err)
        });
    return sessionData;
};

export const getUserData = async (token) => {
    var userData = null;
    const url = `/auth/sessions/${token}`
    await axios.get(url)
        .then(res => {
            (res.data !== "") && (userData = res.data);
        }).catch(err => {
            console.log(err);
        });
    return userData;
};

export const forgetPassword = async (email) => {
    var userData = null;
    const url = `/auth/forget-password/${email}`
    await axios.post(url)
        .then(res => {
            (res.data !== "") && (userData = res.data);
        }).catch(err => {
            console.log(err);
            //dispatch(setError(err));
        });
    return userData;
};

export const resetPassword = async (data) => {
    var response = null;
    const url = `/auth/reset-password`
    await axios.post(url)
        .then(res => {
            (res.data !== "") && (response = res.data);
        }).catch(err => {
            console.log(err);
            //dispatch(setError(err));
        });
    return response;
};