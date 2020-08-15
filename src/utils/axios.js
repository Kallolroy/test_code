import React from 'react';
import axios from "axios";
import config from '../config';
import { Redirect } from 'react-router-dom'

const axiosInstance = axios.create({
    baseURL: config.api.base,
    headers: {'Content-Type': 'application/json; charset=utf-8'}
})

const getAuthToken = () => {
    return localStorage.getItem('token');
}

axiosInstance.interceptors.request.use(function (config) {
    config.headers = {
        ...config.headers
        , api_key: getAuthToken()
        , 'Content-Type': 'application/json'
        ,'Accept' : '*/*'
    };
    // you can also do other modification in config
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    if (response.status === 401) {
        // your failure logic
        return <Redirect to="/login" />
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance
