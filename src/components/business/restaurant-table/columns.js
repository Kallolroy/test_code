import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import i18n from '../../../i18n';

const columns = (printQRCode) =>

    [
        { title: 'id', field: 'id', hidden: true },
        {
            title: i18n.t('common.branch'), field: 'branch.name',
        },
        {
            title: i18n.t('TableForm.floor_no'), field: 'section.name',
        },
        {
            title: i18n.t('TableForm.table_name'), field: 'name',
            render: rowData =>
                <Link color="secondary" href="#">{rowData.name}</Link>
        },
        { title: i18n.t('TableForm.table_number'), field: 'tableNo' },
        { title: i18n.t('TableForm.no_Seats'), field: 'noOfSeats' },
        { title: i18n.t('TableForm.table_code'), field: 'tableCode' },

        {
            title: '', field: '',
            render: rowData =>
                <Button color="secondary" onClick={(e) => printQRCode(rowData)} variant="contained" style={{ 'font-size': '8px' }} size="small">{i18n.t('TableForm.print_qr_code')}</Button>
        },
    ]

export default columns