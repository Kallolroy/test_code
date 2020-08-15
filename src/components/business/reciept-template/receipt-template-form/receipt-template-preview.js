import React from 'react';
import { makeStyles, Button, Box, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {},
  previewWrapper: {
    width: '60%',
    marginTop: 0,
    marginBottom: theme.spacing(3),
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2),
    backgroundColor: 'rgb(242,242,242)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& p': {
      marginTop: 0,
      marginBottom: 0,
      padding: 0,
      fontSize: '13px',
      lineHeight: '1.3',
      textTransform: 'uppercase',
    },
  },
  companyLogo: {
    height: '90px',
    width: 'auto',
    maxWidth: '90%',
    marginBottom: theme.spacing(2),
  },
  companyName: {
    fontWeight: 600,
  },
  phone: {},
  address: {},
  headerNote: {
    textAlign: 'center',
    color: theme.palette.text.primary,
    textTransform: 'uppercase',
  },
  body: {
    paddingTop: '20px',
    paddingBottom: '20px',
    '& p': {
      fontFamily: 'Ubuntu Mono, monospace',
    },
  },
  footer: {
    '& pre': {
      textTransform: 'uppercase',
    },
    '& p': {
      textTransform: 'uppercase',
      textAlign: 'center',
    },
  },
  closeButton: {
    display: 'block',
    marginLeft: 'auto',
  },
  block: {
    display: 'block',
    borderBottom: `1px solid ${theme.palette.border.primary}`,
    '&.customer-name': {
      marginBottom: theme.spacing(1),
      '& .row': {
        '& p': {
          textTransform: 'none',
        },
      },
    },
    '&:last-of-type': {
      borderBottom: 'none',
      marginBottom: theme.spacing(2),
    },
    '& .row': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& p': {
        fontSize: '14px',
        fontWeight: 400,
        textTransform: 'uppercase',
        color: theme.palette.text.primary,
        '&:first-of-type': {
          textAlign: 'left',
        },
        '&:last-of-type': {
          textAlign: 'right',
        },
      },
    },
    '& .row.title-row': {
      '& p': {
        fontWeight: 600,
      },
    },
    '& .row.subtitle-row': {
      '& p': {
        fontSize: '13px',
      },
    },
    '& .row.supertitle-row': {
      '& p': {
        fontSize: '19px',
        fontWeight: 600,
      },
    },
  },
  transactionNumber: {
    fontSize: '14px',
    fontWeight: 400,
    color: theme.palette.text.primary,
  },
}));

let NxtReceiptTemplatePreview = ({
  formValues: {
    companyName,
    branchName,
    branchAddress,
    phone,
    headerNote,
    footerNote,
  },
  logo,
  handleClose,
  props,
  formData,
}) => {
  const classes = useStyles();
  const [t] = useTranslation();
  const { templateData } = props;
  let values = formData;
  let recptCompanyName,
    recptBranchName,
    receptBranchAddress,
    receptfooterNote,
    receptHeaderNote,
    receptPhoneNo;

  values.companyName_en && (recptCompanyName = values.companyName_en);
  values.companyName_ja && (recptCompanyName = values.companyName_ja);
  values.companyName_ko && (recptCompanyName = values.companyName_ko);
  values.companyName_zh && (recptCompanyName = values.companyName_zh);

  values.branchName_en && (recptBranchName = values.branchName_en);
  values.branchName_ja && (recptBranchName = values.branchName_ja);
  values.branchName_ko && (recptBranchName = values.branchName_ko);
  values.branchName_zh && (recptBranchName = values.branchName_zh);

  values.branchAddress_en && (receptBranchAddress = values.branchAddress_en);
  values.branchAddress_ja && (receptBranchAddress = values.branchAddress_ja);
  values.branchAddress_ko && (receptBranchAddress = values.branchAddress_ko);
  values.branchAddress_zh && (receptBranchAddress = values.branchAddress_zh);

  values.phone_en && (receptPhoneNo = values.phone_en);
  values.phone_ja && (receptPhoneNo = values.phone_ja);
  values.phone_ko && (receptPhoneNo = values.phone_ko);
  values.phone_zh && (receptPhoneNo = values.phone_zh);

  values.headerNote_en && (receptHeaderNote = values.headerNote_en);
  values.headerNote_ja && (receptHeaderNote = values.headerNote_ja);
  values.headerNote_ko && (receptHeaderNote = values.headerNote_ko);
  values.headerNote_zh && (receptHeaderNote = values.headerNote_zh);

  values.footerNote_en && (receptfooterNote = values.footerNote_en);
  values.footerNote_ja && (receptfooterNote = values.footerNote_ja);
  values.footerNote_ko && (receptfooterNote = values.footerNote_ko);
  values.footerNote_zh && (receptfooterNote = values.footerNote_zh);

  console.log('FORM VALUES: ');
  console.log(values);
  console.log(receptPhoneNo);

  return (
    <Box className={classes.root}>
      <Box className={classes.previewWrapper}>
        <Box className={classes.header}>
          {logo ? (
            <img
              src={logo}
              alt="company logo"
              className={classes.companyLogo}
            />
          ) : (
            ''
          )}
          <Typography variant="body1" className={classes.companyName}>
            {recptCompanyName + ' - ' + recptBranchName}
          </Typography>
          <Typography variant="body1" className={classes.address}>
            {receptBranchAddress}
          </Typography>
          {receptPhoneNo ? (
            <Typography variant="body1" className={classes.phone}>
              {t('NxtReceiptTemplate.FieldLabelPhone') + ' :' + receptPhoneNo}
            </Typography>
          ) : (
            ''
          )}

          {headerNote ? (
            <Typography variant="body1" className={classes.headerNote}>
              {receptHeaderNote}
            </Typography>
          ) : (
            ''
          )}
        </Box>

        <Box className={classes.body}>
          <Box className={clsx(classes.block, 'customer-name')}>
            <Box className="row title-row">
              <Typography>{t('ReceiptTemplate.customer_name')}</Typography>
              <Typography>{t('ReceiptTemplate.order_number')}</Typography>
            </Box>

            <Box className="row subtitle-row">
              <Typography>{t('ReceiptTemplate.table_number')}</Typography>
              <Typography>{t('ReceiptTemplate.date')}</Typography>
            </Box>
          </Box>

          <Box className={classes.block}>
            <Box className="row title-row">
              <Typography>{t('ReceiptTemplate.section_1_title')}</Typography>
            </Box>
            <Box className="row">
              <Typography>
                {t('ReceiptTemplate.section_1_item_1_title')}
              </Typography>
              <Typography>
                {t('ReceiptTemplate.section_1_item_1_price')}
              </Typography>
            </Box>
            <Box className="row">
              <Typography>
                {t('ReceiptTemplate.section_1_item_2_title')}
              </Typography>
              <Typography>
                {t('ReceiptTemplate.section_1_item_2_price')}
              </Typography>
            </Box>
          </Box>

          <Box className={classes.block}>
            <Box className="row title-row">
              <Typography>{t('ReceiptTemplate.section_2_title')}</Typography>
              <Typography>{t('ReceiptTemplate.section_2_price')}</Typography>
            </Box>
            <Box className="row">
              <Typography>
                {t('ReceiptTemplate.section_2_item_1_title')}
              </Typography>
            </Box>
            <Box className="row">
              <Typography>
                {t('ReceiptTemplate.section_1_item_2_title')}
              </Typography>
            </Box>
          </Box>

          <Box className={classes.block}>
            <Box className="row title-row">
              <Typography>{t('ReceiptTemplate.section_3_title')}</Typography>
            </Box>
            <Box className="row">
              <Typography>
                {t('ReceiptTemplate.section_3_item_1_title')}
              </Typography>
              <Typography>
                {t('ReceiptTemplate.section_3_item_1_price')}
              </Typography>
            </Box>
            <Box className="row">
              <Typography>
                {t('ReceiptTemplate.section_3_item_2_title')}
              </Typography>
              <Typography>
                {t('ReceiptTemplate.section_3_item_2_price')}
              </Typography>
            </Box>
          </Box>

          <Box className={classes.block}>
            <Box className="row title-row">
              <Typography>{t('ReceiptTemplate.section_4_title')}</Typography>
            </Box>
            <Box className="row">
              <Typography>
                {t('ReceiptTemplate.section_4_item_1_title')}
              </Typography>
              <Typography>
                {t('ReceiptTemplate.section_4_item_1_price')}
              </Typography>
            </Box>
            <Box className="row">
              <Typography>
                {t('ReceiptTemplate.section_4_item_2_title')}
              </Typography>
              <Typography>
                {t('ReceiptTemplate.section_4_item_2_price')}
              </Typography>
            </Box>
            <Box className="row">
              <Typography>
                {t('ReceiptTemplate.section_4_item_3_title')}
              </Typography>
              <Typography>
                {t('ReceiptTemplate.section_4_item_3_price')}
              </Typography>
            </Box>
          </Box>

          <Box className={clsx(classes.block)}>
            <Box className="row supertitle-row">
              <Typography>{t('ReceiptTemplate.section_5_title')}</Typography>
              <Typography>{t('ReceiptTemplate.section_5_price')}</Typography>
            </Box>

            <Box className="row">
              <Typography>
                {t('ReceiptTemplate.section_5_item_1_title')}
              </Typography>
              <Typography>
                {t('ReceiptTemplate.section_5_item_1_price')}
              </Typography>
            </Box>
          </Box>

          <Typography className={classes.transactionNumber}>
            {t('ReceiptTemplate.transaction_ref')}
          </Typography>
        </Box>

        <Box className={classes.footer}>
          <Typography>{receptfooterNote}</Typography>
        </Box>
      </Box>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClose}
        className={classes.closeButton}
      >
        {t('common.close_button')}
      </Button>
    </Box>
  );
};

NxtReceiptTemplatePreview = connect((state) => {
  return {
    formValues: state.form.ReceiptTemplateForm.values,
  };
})(NxtReceiptTemplatePreview);

export default NxtReceiptTemplatePreview;
