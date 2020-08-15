import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, BrowserRouter as Router } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import i18n from '../../../i18n';

const defaultProps = {
    // bgcolor: '#ef6c00',
    borderColor: 'text.primary',
    m: 1,
    border: 0,
    style: { width: '3.2rem', height: '1.2rem' },
};

const activeStyle = {
    'background-color': '#f18e00',
    'color': 'rgba(255,255,255,1)'
}

const InActiveStyle = {
    'background-color': '#e0e0e0',
    'color': 'rgba(0,0,0,0.87)'
}

const columns = (handleOrderUpClick, handleOrderDownClick) =>

    [
        { title: 'id', field: 'id', hidden: true },
        {
            title: i18n.t('table_column.name'), field: 'name.en-US',
            render: rowData =>
                <NavLink style={{ 'color': '#ef6c00' }} to={`/food-items-ref/${rowData.id}/menus`}>
                    {rowData.name['en-US']}
                </NavLink>
        },
        {
            title: i18n.t('MenuForm.type'), field: 'menuType',
        },
        {
            title: i18n.t('common.status'), field: 'isActive',
            render: rowData =>
                <Box borderRadius="25px" textAlign="center" style={rowData.isActive ? activeStyle : InActiveStyle} >
                    {rowData.isActive ? 'Active' : 'inActive'}
                </Box>
        },
        {
            title: i18n.t('MenuForm.menu_hour'), field: 'timeBoundDuration',
        },
        {
            title: i18n.t('MenuForm.time_limit'), field: 'reminderTime',
        },
        {
            title: i18n.t('common.price'), field: 'packagePrice',
        },
        {
            title: '', field: '',
            render: rowData => {
                const appContext = localStorage.getItem("appContext") ? JSON.parse(localStorage.getItem("appContext")) : { isCompany: true }
                if (!appContext.isCompany && !rowData.branchId) {
                    // alert(appContext.isCompany)
                    return <LockOpenIcon style={{ color: '#f18e00', 'font-size': '16px' }}></LockOpenIcon>
                }

            }
        }
    ]

export default columns