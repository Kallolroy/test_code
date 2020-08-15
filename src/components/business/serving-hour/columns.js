import React from 'react';

import {  BrowserRouter as Router } from 'react-router-dom'
import { Typography } from '@material-ui/core';

import i18n from '../../../i18n';

const nameStyle = {
    'font-size': '14px',
    'font-weight': 500,
    'text-transform': 'capitalize'
}

const regularColumnStyle = {
    'font-size': '14px',
    'font-weight': 400,
    'text-transform': 'capitalize'
}

const timeFormater = (time) => {
    let timeHour = time.split('T')[1] ? time.split('T')[1].substring(0,5) : time
    let [hours, minutes] = timeHour.split(":");

    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

const columns = (handleOrderUpClick, handleOrderDownClick) =>
    [
        { title: 'id', field: 'id', hidden: true },
        {
            title: i18n.t('NxtServingHour.TableHeader_Name'), field: 'name',
            cellStyle: { width: '60% ', minWidth: '60% '},
            headerStyle: { width: '60% ', minWidth: '60% '},
            render: rowData =>
                <Typography color="secondary" style={nameStyle}>
                    {rowData.name}
                </Typography>
        },
        {
            title: i18n.t('NxtServingHour.TableHeader_Start_Time'), field: 'startTime',
            cellStyle: { width: '20% ', minWidth: '20% '},
            headerStyle: { width: '20% ', minWidth: '20% '},
            render: rowData =>
                <Typography style={regularColumnStyle}>
                    {timeFormater(rowData.startTime)}
                </Typography>
        },
        {
            title: i18n.t('NxtServingHour.TableHeader_End_Time'), field: 'endTime',
            cellStyle: { width: '20% ', minWidth: '20% '},
            headerStyle: { width: '20% ', minWidth: '20% '},
            render: rowData => 
                <Typography style={regularColumnStyle}>
                   {timeFormater(rowData.endTime)}
                </Typography>
        },
        
    ]

export default columns;
