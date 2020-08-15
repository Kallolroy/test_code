import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, BrowserRouter as Router } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
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
    'color': 'rgba(255,255,255,1)',
    'width': '65px'
}

const InActiveStyle = {
    'background-color': '#e0e0e0',
    'color': 'rgba(0,0,0,0.87)',
    'width': '65px'
}

const columns = (handleOrderUpClick, handleOrderDownClick) =>

    [
        { title: 'id', field: 'id', hidden: true },
        {
            title: i18n.t('MenuItemForm.category'), field: '',
            render: rowData =>
                <NavLink to={`/food-items-ref/${rowData.id}/foodCategories`} style={{ 'color': '#ef6c00', 'text-decoration': 'none' }}>
                    {rowData.name['en-US'] ? rowData.name['en-US'] : rowData.name}
                </NavLink>
        },
        { title: i18n.t('common.Description'), field: 'description.en-US' },
        {
            title: i18n.t('common.status'), field: 'isActive',
            render: rowData =>
                <Box borderRadius="25px" textAlign="center" style={rowData.isActive ? activeStyle : InActiveStyle} >
                    {rowData.isActive ? 'Active' : 'inActive'}
                </Box>
        },

    ]

export default columns