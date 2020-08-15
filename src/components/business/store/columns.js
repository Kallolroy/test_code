import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { NavLink, BrowserRouter as Router } from 'react-router-dom'
import i18n from '../../../i18n';

const link =
{
    'text-decoration': 'none',
    color: '#f18e00'
}

const columns = () =>
    [
        { title: 'id', field: 'id', hidden: true },
        {
            title: i18n.t('BranchForm.StoreName'), field: 'name',
            render: rowData =>
                <NavLink to={"#"} style={link} color="secondary">{rowData.name}</NavLink>
            // <Link color="secondary" href={"/restauranttables/" + rowData.id}>{rowData.name}</Link>
        },
        { title: i18n.t('BranchForm.Address'), field: 'address' },
        { title: i18n.t('BranchForm.Phone'), field: 'phone' },
    ]

export default columns