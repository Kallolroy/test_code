import React, { useEffect, Suspense, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import IxSelectField from '../../../basic/ix-selectfield';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import DialogActions from '@material-ui/core/DialogActions';
import { deepOrange, green, grey } from '@material-ui/core/colors';
import validate from './validate';
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import IxSwitch from '../../../basic/ix-switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import QrReader from 'react-qr-reader';
import IxModal from '../../../composite/ix-modal';
import QRCode from 'react-qr-code';
import htmlToImage from 'html-to-image';
import { fetchBranchSections } from '../../../../actions/company/table-actions';
import { tableCodeGegerate } from '../../../basic/ix-date-calculate';
import Hidden from '@material-ui/core/Hidden';

let QrCodeForm = ({
    tableCode,
    handleQRModalClose,

}) => {
    const svgRef = useRef(null);
    const { t, i18n } = useTranslation();
    const printQRCode = () => {

        var node = document
            .getElementById('printDiv')

        // var node = document
        //     .getElementById('QRCodeDiv')
        //     .getElementsByTagName('svg')[0];

        htmlToImage
            .toJpeg(node)
            .then(function (dataUrl) {
                // var img = new Image();
                // img.src = dataUrl;
                // node.appendChild(img);
                const linkSource = dataUrl;
                const downloadLink = document.createElement('a');
                const fileName = 'QRCode.jpeg';
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                downloadLink.click();
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    };

    return (
        <>
            <div id="printDiv" style={{backgroundColor:'white'}}>
                <Box textAlign="center">
                    <Typography
                        component="h1"
                        variant="h6"
                        style={{ fontSize: '30px', fontWeight: 400 }}
                    >
                        {t('QRCodeForm.scan')}
                    </Typography>
                    <Typography
                        component="h1"
                        variant="h6"
                        style={{ fontSize: '20px', fontWeight: 500 }}
                    >
                        {tableCode ? tableCode : null}
                    </Typography>
                </Box>
                <Box textAlign="center" id="QRCodeDiv">
                    <QRCode ref={svgRef} value={tableCode ? tableCode : null} />
                </Box>
                <Box textAlign="center">
                    <Typography
                        component="h1"
                        variant="h6"
                        style={{ fontSize: '20px', fontWeight: 400 }}
                    >
                        {t('QRCodeForm.use_qr')}
                    </Typography>
                    <Typography
                        component="h1"
                        variant="h6"
                        style={{ fontSize: '30px', fontWeight: 400 }}
                    >
                        {`${t('TableForm.table_code')} -${tableCode}`}
                    </Typography>
                </Box>

            </div>
            <DialogActions>
                <Button variant="contained" onClick={handleQRModalClose}>
                    {t('common.cancel_button')}
                </Button>
                <Button variant="contained" onClick={printQRCode} color="secondary">
                    {t('common.print')}
                </Button>
            </DialogActions>
        </>
    )
}

export default QrCodeForm;