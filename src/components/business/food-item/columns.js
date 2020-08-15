import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink, BrowserRouter as Router } from 'react-router-dom'
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import EcoIcon from '@material-ui/icons/Eco';
import LocalBarIcon from '@material-ui/icons/LocalBar';
import MoodIcon from '@material-ui/icons/Mood';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import InvertColorsOffIcon from '@material-ui/icons/InvertColorsOff';
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
                <NavLink style={{ 'color': '#ef6c00' }} to={`/food-items-ref/${rowData.id}/foodItems`}>
                    {rowData.name['en-US']}
                </NavLink>

        },
        {
            title: i18n.t('NxtFoodItemHome.p_time'), field: 'prepareDuration',
            cellStyle: { 'width': '150px' },

        },
        {
            title: i18n.t('FoodItemForm.Calories'), field: 'calorie',

        },
        {

            title: '', field: '',
            cellStyle: { 'width': '30px' },
            render: rowData => {
                const html = [];
                rowData.isVeg &&
                    html.push(<EcoIcon style={{ color: '#f18e00', 'font-size': '16px' }}>
                    </EcoIcon>)
                rowData.isHalal &&
                    html.push(<span style={{ color: '#f18e00', 'font-size': '16px', 'margin': '0 5px' }}>
                        H
                    </span>)
                rowData.isKidItem &&
                    html.push(<MoodIcon style={{ color: '#f18e00', 'font-size': '16px' }}>
                    </MoodIcon>)
                rowData.isAlcoholAdded &&
                    html.push(<LocalBarIcon style={{ color: '#f18e00', 'font-size': '16px' }}>
                    </LocalBarIcon>)
                return html;
            }
        },

        {
            title: i18n.t('common.status'), field: 'isActive',
            render: rowData =>
                <Box borderRadius="25px" textAlign="center" style={rowData.isActive ? activeStyle : InActiveStyle} >
                    {rowData.isActive ? 'Active' : 'inActive'}
                </Box>
        },
        {
            title: i18n.t('common.price'), field: 'defaultPrice',

        },
        {
            title: i18n.t('FoodItemForm.defaultStock'), field: 'dailyOpeningCount',

        },
        {
            title: i18n.t('FoodItemForm.currentStock'), field: 'currentStock',

        },
        {
            title: 'Display Order', field: 'displayOrder', hidden: true,
            defaultSort: "asc"
        },
        {
            title: '', field: '', hidden: false,
            cellStyle: { 'text-align': 'right', 'width': '30px' },
            render: rowData =>
                <Box display="flex"
                    // style={{
                    //     position: 'absolute',
                    //     left: '50%',
                    //     width: 0,
                    //     'z-index': 99
                    // }}
                    >
                    <IconButton color="secondary" aria-label="up" onClick={(e) => handleOrderUpClick(rowData)} component="span">
                        <ArrowUpwardIcon />
                    </IconButton>
                    <IconButton color="secondary" aria-label="down" onClick={(e) => handleOrderDownClick(rowData)} component="span">
                        <ArrowDownwardIcon />
                    </IconButton>
                </Box >

        }
    ]

export default columns