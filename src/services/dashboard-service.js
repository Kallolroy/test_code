import axios from "../utils/axios";
import { setError } from '../actions/error-actions';

export const getSalesPerDay = async (companyId, branchId) => {
    let url = branchId ? `/admin/dashboard/companies/${companyId}/dine-type/sales/per-day?branchId=${branchId}` : `/admin/dashboard/companies/${companyId}/dine-type/sales/per-day`
    let salesData = null
    await axios.get(url)
        .then(res => {
            res.data !== "" && res.data.token !== "" && (salesData = res.data)
        }).catch(err => {
            console.log(err)
        });
    return salesData;
};

export const getGenderWiseCustomers = async (companyId, branchId) => {
    let url = branchId ? `/admin/dashboard/companies/${companyId}/customers/gender?branchId=${branchId}` : `/admin/dashboard/companies/${companyId}/customers/gender`
    let customerData = null
    await axios.get(url)
        .then(res => {
            res.data !== "" && res.data.token !== "" && (customerData = res.data)
        }).catch(err => {
            console.log(err)
        });
    return customerData;
};

export const getCustomersPerDay = async (companyId, branchId) => {
    let url = branchId ? `/admin/dashboard/companies/${companyId}/customers/per-day?branchId=${branchId}` : `/admin/dashboard/companies/${companyId}/customers/per-day`
    let customerData = null
    await axios.get(url)
        .then(res => {
            res.data !== "" && res.data.token !== "" && (customerData = res.data)
        }).catch(err => {
            console.log(err)
        });
    return customerData;
};

export const getTopChoices = async (companyId, branchId) => {
    let url = branchId ? `/admin/dashboard/companies/${companyId}/food-items/top-choices?branchId=${branchId}` : `/admin/dashboard/companies/${companyId}/food-items/top-choices`
    let choicesData = null
    await axios.get(url)
        .then(res => {
            res.data !== "" && res.data.token !== "" && (choicesData = res.data)
        }).catch(err => {
            console.log(err)
        });
    return choicesData;
};

export const getTopNotifications = async (companyId, branchId) => {
    let url = branchId ? `/admin/dashboard/companies/${companyId}/notifications?branchId=${branchId}` : `/admin/dashboard/companies/${companyId}/notifications`
    let data = null
    await axios.get(url)
        .then(res => {
            res.data !== "" && res.data.token !== "" && (data = res.data)
        }).catch(err => {
            console.log(err)
        });
    return data;
};