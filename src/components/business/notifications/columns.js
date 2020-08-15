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

const columns =()=>
    [
        { title: 'id', field: 'id', hidden: true },
        {
            title: i18n.t('NotificationForm.Subject'), field: 'subject',
        },
        { title: i18n.t('NotificationForm.Message'), field: 'body' },
        { title: i18n.t('NotificationForm.sendTo'), field: 'sendTo' },
        { title: i18n.t('NotificationForm.sendDate'), field: 'sentDate' }

    ]

export default columns