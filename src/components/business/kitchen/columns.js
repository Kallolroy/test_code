import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import i18n from '../../../i18n';

const columns = (isCompany) =>

    [
        { title: 'id', field: 'id', hidden: true },
        { title: i18n.t('KitchenForm.store'), field: 'branch.name', hidden: !isCompany },
        {
            title: i18n.t('KitchenForm.kitchen_name'), field: 'name',
            render: rowData =>
                <Link color="secondary" href="#">{rowData.name}</Link>
        }
    ]

export default columns