import React from 'react';
import { NavLink, BrowserRouter as Router } from 'react-router-dom'
import { Typography } from '@material-ui/core';
import { Box, } from '@material-ui/core';

import i18n from '../../../i18n';

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

const nameStyle = {
    'font-size': '14px',
    'font-weight': '500',
    'text-transform': 'capitalize'
}

const regularColumnStyle = {
    'font-size': '14px',
    'font-weight': '400',
    'text-transform': 'capitalize'
}
const displayChoiceItemCount = 2;
const columns = (handleOrderUpClick, handleOrderDownClick) =>
    [
        { title: 'id', field: 'id', hidden: true },
        {
            title: i18n.t('NxtChoicesGroup.TableHeader_Name'), field: 'name.en-US',
            cellStyle: { width: '30% ', minWidth: '30% '},
            headerStyle: { width: '30% ', minWidth: '30% '},
            render: rowData =>
            <Typography color="secondary" style={nameStyle}>
                {rowData.name['en-US']}
            </Typography>
        },
        {
            title: i18n.t('NxtChoicesGroup.TableHeader_Choice_Selection'), field: 'isRequired',
            cellStyle: { width: '10% ', minWidth: '10% '},
            headerStyle: { width: '10% ', minWidth: '10% '},
            render: rowData =>
                <Typography style={regularColumnStyle}>
                    {rowData.isRequired ? i18n.t('common.required') : i18n.t('common.optional')}
                </Typography>
        },
        {
            title: i18n.t('NxtChoicesGroup.TableHeader_Choice_Items'), field: 'choicesItems',
            cellStyle: { width: '30% ', minWidth: '30% '},
            headerStyle: { width: '30% ', minWidth: '30% '},
            render: rowData =>
                rowData.choicesItems && rowData.choicesItems.length ?
                <Box>
                    {rowData.choicesItems.map((item, index) => {
                        let commaCount = (displayChoiceItemCount < rowData.choicesItems.length ? displayChoiceItemCount : rowData.choicesItems.length) -1;
                        const coiceItemName = item.name['en-US'] + (index < commaCount ? ', ' : '');
                        return(
                            <Typography variant="span" style={regularColumnStyle}>
                                {coiceItemName} 
                            </Typography>
                         );
                     })}
                     <Typography variant="span" style={regularColumnStyle}>
                        {rowData.choicesItems.length > displayChoiceItemCount ? (', +' + (rowData.choicesItems.length - displayChoiceItemCount).toString()) : ''} 
                    </Typography>
                </Box> : ''
        },
        {
            title: i18n.t('NxtChoicesGroup.TableHeader_Number_Of_Choice'), field: 'isMultiValued',
            cellStyle: { width: '10% ', minWidth: '10% '},
            headerStyle: { width: '10% ', minWidth: '10% '},
            render: rowData =>
                <Typography style={regularColumnStyle}>
                    {rowData.isMultiValued ? i18n.t('NxtChoicesGroup.ChoiceMultiple') : i18n.t('NxtChoicesGroup.ChoiceSingle')}
                </Typography>
        },
        {
            title: i18n.t('NxtChoicesGroup.TableHeader_Status'), field: 'isActive',
            cellStyle: { width: '10% ', minWidth: '10% '},
            headerStyle: { width: '10% ', minWidth: '10% '},
            render: rowData =>
                <Box borderRadius="25px" textAlign="center" style={rowData.isActive ? activeStyle : InActiveStyle} >
                    {rowData.isActive ? i18n.t('common.active') : i18n.t('common.inactive')}
                </Box>
        },
        
    ]

export default columns;