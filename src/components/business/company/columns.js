import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Box } from '@material-ui/core';
import { NavLink, BrowserRouter as Router } from 'react-router-dom'
import i18n from '../../../i18n';

const link =
{
    'text-decoration': 'none',
    color: '#f18e00'
}

const activeStyle = {
    'background-color': '#f18e00',
    'color': 'rgba(255,255,255,1)',
    'width': '65px'
}

const InActiveStyle = {
    'background-color': '#e0e0e0',
    'color': 'rgba(0,0,0,0.87)',
    'width': '65px'
}

const columns = () =>
    [
        { title: 'id', field: 'id', hidden: true },
        {
            title: i18n.t('CompanyForm.CompanyName'), field: 'name',
            render: rowData =>
                <NavLink to={"#"} style={link} color="secondary">{rowData.name}</NavLink>
            // <Link color="secondary" href={"/restauranttables/" + rowData.id}>{rowData.name}</Link>
        },
        { title: i18n.t('IxLeftBarMenu.Stores'), field: 'allowableBranches' },
        { title: i18n.t('common.Email'), field: 'email' },
        { title: i18n.t('table_column_phone'), field: 'phone' },
        {
            title: i18n.t('common.status'), field: 'isActive',
            render: rowData =>
                <Box borderRadius="25px" textAlign="center" style={rowData.isActive ? activeStyle : InActiveStyle} >
                    {rowData.isActive ? 'Active' : 'inActive'}
                </Box>
        },
        { title: i18n.t('commonRegistered'), field: 'createdDate' }

    ]

export default columns