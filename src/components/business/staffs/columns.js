import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom'
import { Typography, Box } from '@material-ui/core';

import i18n from '../../../i18n';

const nameStyle = {
    'font-size': '14px',
    'font-weight': 500,
    // 'text-transform': 'capitalize'
}

const regularColumnStyle = {
    'font-size': '14px',
    'font-weight': '400',
    // 'text-transform': 'capitalize'
}

const activeStyle = {
    'color': 'rgba(255,255,255,1)',
    'background-color': '#f18e00',
    'padding-left': '12px',
    'padding-right': '12px',
    'font-size': '13px',
    'font-weight': '400',
    'border-radius': '16px',
    'height': '24px',
    'line-height': '24px',
    'display': 'inline-block',
    'width': '72px'
}

const InActiveStyle = {
    'color': 'rgba(0,0,0,0.87)',
    'background-color': '#e0e0e0',
    'padding-left': '12px',
    'padding-right': '12px',
    'font-size': '13px',
    'font-weight': '400',
    'border-radius': '16px',
    'height': '24px',
    'line-height': '24px',
    'display': 'inline-block',
    'width': '72px'
}

const timeFormater = (time) => {
    let [hours, minutes] = time.split(":");

    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
const displayRoleItemCount = 1;
const columns = (handleOrderUpClick, handleOrderDownClick) =>
    [
        { title: 'id', field: 'id', hidden: true },
        {
            title: i18n.t('table_column.name'), field: '',
            cellStyle: { width: '25% ', minWidth: '25% ' },
            headerStyle: { width: '25% ', minWidth: '25% ' },
            render: rowData =>
                <Typography color="secondary" style={nameStyle}>
                    {rowData.user.firstName + ' ' + rowData.user.lastName}
                </Typography>
        },
        {
            title: i18n.t('signin.UserName'), field: 'user.userName',
            cellStyle: { width: '10% ', minWidth: '10% ' },
            headerStyle: { width: '10% ', minWidth: '10% ' },
            render: rowData => {
                return (
                    <Typography style={regularColumnStyle}>
                        {rowData.user.userName}
                    </Typography >
                )
            }

        },
        {
            title: i18n.t('common.Email'), field: 'rowData.user.email',
            cellStyle: { width: '20% ', minWidth: '20% ' },
            headerStyle: { width: '20% ', minWidth: '20% ' },
            render: rowData =>
                <Typography color="secondary" style={nameStyle}>
                    {rowData.user.email}
                </Typography>
        },
        {
            title: i18n.t('NxtStaffs.TableHeader_Role'), field: '',
            cellStyle: { width: '20% ', minWidth: '20% ' },
            headerStyle: { width: '20% ', minWidth: '20% ' },
            render: rowData =>
                rowData.user && rowData.user.roles && rowData.user.roles.length ?
                    <Box>
                        {
                            rowData.user.roles.map((role, index) => {
                                let commaCount = (displayRoleItemCount < rowData.user.roles.length ? displayRoleItemCount : rowData.user.roles.length) - 1;
                                const roleName = role.name + (index < commaCount ? ', ' : '');
                                if (index < displayRoleItemCount) {
                                    return (
                                        <Typography variant="span" style={regularColumnStyle}>
                                            {roleName}
                                        </Typography>
                                    )
                                }

                            })}
                        <Typography variant="span" style={regularColumnStyle}>
                            {rowData.user.roles.length > displayRoleItemCount ? (', +' + (rowData.user.roles.length - displayRoleItemCount).toString()) : ''}
                        </Typography>
                    </Box> : ''
        },
        {
            title: i18n.t('NxtStaffs.TableHeader_Access'), field: 'branch.name',
            cellStyle: { width: '10% ', minWidth: '10% ' },
            headerStyle: { width: '10% ', minWidth: '10% ' },
            render: rowData =>
                <Typography style={regularColumnStyle}>
                    {rowData.branch && rowData.branch.name ? rowData.branch.name : ""}
                </Typography>
        },
        {
            title: i18n.t('common.status'), field: 'isActive',
            cellStyle: { width: '10% ', minWidth: '10% ' },
            headerStyle: { width: '10% ', minWidth: '10% ' },
            render: rowData =>
                <Box borderRadius="25px" textAlign="center" style={rowData.user && rowData.user.isActive ? activeStyle : InActiveStyle} >
                    {rowData.user && rowData.user.isActive ? i18n.t('common.active') : i18n.t('common.inactive')}
                </Box>
        },

    ]

export default columns;
