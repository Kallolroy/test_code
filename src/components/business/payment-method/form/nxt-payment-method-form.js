import React, { useEffect, Suspense, useRef } from 'react';
import clsx from 'clsx';
import { Field, FieldArray, reduxForm } from 'redux-form';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './style';
import Box from '@material-ui/core/Box';

import DialogActions from '@material-ui/core/DialogActions';
import { deepOrange, green, grey, red } from '@material-ui/core/colors';
import validate from './validate';
import Avatar from '@material-ui/core/Avatar';
import IxSwitch from '../../../basic/ix-switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PaymentCash from './../../../../assets/images/next-payment-icons/next-icon-payment-cash.png';
import VisaIcon from './../../../../assets/images/next-payment-icons/next-icon-payment-visa.png';
import MasterCardIcon from './../../../../assets/images/next-payment-icons/next-icon-payment-master-card.png';
import AmericanExpressIcon from './../../../../assets/images/next-payment-icons/next-icon-payment-american-express.png';
import PaypalPayIcon from './../../../../assets/images/next-payment-icons/next-icon-payment-paypal.png';
import AmazonPayIcon from './../../../../assets/images/next-payment-icons/next-icon-payment-amazon-pay.png';
import GooglePayIcon from './../../../../assets/images/next-payment-icons/next-icon-payment-google-pay.png';
import LinePayIcon from './../../../../assets/images/next-payment-icons/next-icon-payment-line-pay.png';
import AliPayIcon from './../../../../assets/images/next-payment-icons/next-icon-payment-ali-pay.png';
import ApplePayIcon from './../../../../assets/images/next-payment-icons/next-icon-payment-apple-pay.png';
import FlagIcons from '../../../../assets/images/next-payment-icons/icons';

import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { useTranslation } from 'react-i18next';
import Switch from '@material-ui/core/Switch';
import _ from 'lodash';
import { Grid, Paper } from '@material-ui/core';

let PaymentMethodForm = (props) => {
  const {
    paymentMethods,
    handleSubmit,
    handleClose,
    pristine,
    reset,
    submitting,
    error,
    loading,
    initialValues,
    formData,
  } = props;

  const classes = useStyles();
  const { t, i18n } = useTranslation();

  const [expandedOffLine, setExpandedOffLine] = React.useState(true);
  const [expandedCreditCard, setExpandedCreditCard] = React.useState(true);
  const [expandedConvenience, setExpandedConvenience] = React.useState(true);
  const [paymentIntegration, setPaymentIntegration] = React.useState(true);
  //const [merchantId, setMerchantId] = React.useState('');

  let methods = [],
    merchantId = '',
    merchantKey = '';

  if (paymentMethods !== undefined && paymentMethods.data) {
    methods = paymentMethods.data;
  }

  const handleOptChange = (event) => { };

  const handleExpandOffLineClick = (event) => {
    setExpandedOffLine(!expandedOffLine);
  };

  const handleExpandedCreditCardClick = (event) => {
    setExpandedCreditCard(!expandedCreditCard);
  };

  const handleExpandedConvenienceClick = (event) => {
    setExpandedConvenience(!expandedConvenience);
  };

  const handleExpandedPaymentIntegrationClick = () => {
    setPaymentIntegration(!paymentIntegration);
  };

  useEffect(() => {
    
    if (paymentMethods.length > 0) {
      paymentMethods.map((method) => {
        props.change(method.name, false)
      })
    }

    if (initialValues &&
      initialValues.companyPaymentConfigs &&
      initialValues.companyPaymentConfigs.length > 0) {
      props.change("merchantId", initialValues.companyPaymentConfigs[0].paymentMethodConfig.merchandId)
      props.change("merchantKey", initialValues.companyPaymentConfigs[0].paymentMethodConfig.merchantKey)

      initialValues.companyPaymentConfigs.map((paymentConfig) => {
        paymentMethods.map((paymentMethod) => {
          if (paymentMethod.name === paymentConfig['paymentMethodName']) {
            props.change(paymentMethod.name, true)
          }
        })
      })
    }
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.name}>
        <Box p={1}>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            style={{ 'font-size': '12px' }}
          >
            {t('NxtPaymentMethodHome.headerDescription')}
          </Typography>
        </Box>

        <Box display="flex">
          <Box width="90%" pt={2} pl={1}>
            <Typography paragraph variant="paragraph">
              {t('NxtPaymentMethodHome.offlinePayment')}
            </Typography>
          </Box>
          <Box>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expandedOffLine,
              })}
              onClick={handleExpandOffLineClick}
              aria-expanded={expandedOffLine}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>
        <Collapse in={expandedOffLine} timeout="auto">
          {paymentMethods.length
            ? paymentMethods.map((method) => {
              if (method.type === 'CASH') {
                return (
                  <Box display="flex">
                    <Box
                      mb={1}
                      ml={1}
                      width="30%"
                      display="flex"
                      border={1}
                      borderColor="rgb(203, 204, 206)"
                      borderRadius={4}
                    >
                      <Box>
                        <Avatar
                          variant="rounded"
                          className={classes.avatar}
                          src={FlagIcons[method.id]}
                        ></Avatar>
                      </Box>
                      <Box padding={1}>{t('NxtPaymentMethodHome.cash')}</Box>
                      <Box padding={1} textAlign="right" width={'100px'}>
                        <Field
                          //name="isCashPayment"
                          name={method.name}
                          component={IxSwitch}
                        ></Field>
                      </Box>
                    </Box>
                  </Box>
                );
              }
            })
            : null}
        </Collapse>

        <Box display="flex">
          <Box width="90%" pt={2} pl={1}>
            <Typography paragraph variant="paragraph">
              {t('NxtPaymentMethodHome.creditCardPayment')}
            </Typography>
          </Box>
          <Box>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expandedCreditCard,
              })}
              onClick={handleExpandedCreditCardClick}
              aria-expanded={expandedCreditCard}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>
        <Collapse
          className={classes.creditCard}
          in={expandedCreditCard}
          timeout="auto"
        >
          <Grid container spacing={1}>
            {paymentMethods.length
              ? paymentMethods.map((method) => {
                if (method.type === 'CREDIT_CARD') {
                  return (
                    <Grid item xs={4}>
                      <Box
                        mb={1}
                        ml={1}
                        width="97%"
                        display="flex"
                        border={1}
                        borderColor="rgb(203, 204, 206)"
                        borderRadius={4}
                      >
                        <Box>
                          <Avatar
                            variant="rounded"
                            className={classes.avatar}
                            src={FlagIcons[method.id]}
                          ></Avatar>
                        </Box>
                        {method.name === 'JCB' && (
                          <Box padding={1}>
                            {t('NxtPaymentMethodHome.jcb')}
                          </Box>
                        )}
                        {method.name === 'VISA' && (
                          <Box padding={1}>
                            {t('NxtPaymentMethodHome.visa')}
                          </Box>
                        )}
                        {method.name === 'MAX' && (
                          <Box padding={1}>
                            {t('NxtPaymentMethodHome.amex')}
                          </Box>
                        )}
                        {method.name === 'MASTER' && (
                          <Box padding={1}>
                            {t('NxtPaymentMethodHome.master')}
                          </Box>
                        )}
                        {method.name === 'Discover' && (
                          <Box padding={1}>
                            {t('NxtPaymentMethodHome.dinnerClub')}
                          </Box>
                        )}
                        <Box padding={1} textAlign="right" width={'100px'}>
                          <Field
                            name={method.name}
                            component={IxSwitch}
                          ></Field>
                        </Box>
                      </Box>
                    </Grid>
                  );
                }
              })
              : null}
          </Grid>
        </Collapse>

        <Box display="flex">
          <Box width="90%" pt={2} pl={1}>
            <Typography paragraph variant="paragraph">
              {t('NxtPaymentMethodHome.paymentIntegration')}
            </Typography>
          </Box>
          <Box>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: paymentIntegration,
              })}
              onClick={handleExpandedPaymentIntegrationClick}
              aria-expanded={paymentIntegration}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>
        <Collapse in={paymentIntegration} timeout="auto">
          <Box width="30%">
            <Field
              name="merchantId"
              component={IxTextFieldForm}
              label={t('NxtPaymentMethodHome.merchantId')}
            // value={merchantId}
            />
          </Box>
          <Box width="30%">
            <Field
              name="merchantKey"
              component={IxTextFieldForm}
              label={t('NxtPaymentMethodHome.merchantKey')}
            // value={merchantKey}
            />
          </Box>
          <Box p={1} width="50%">
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              style={{ 'font-size': '10px' }}
            >
              {t('NxtPaymentMethodHome.paymentMessage')}
            </Typography>
          </Box>
        </Collapse>

        <DialogActions className={classes.buttons + ' buttonss'}>
          <Button variant="contained" onClick={handleClose}>
            {t('common.cancel_button')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            color="secondary"
          >
            {t('common.submit_button')}
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </DialogActions>
      </form>
    </>
  );
};

PaymentMethodForm = reduxForm({
  form: 'PaymentMethodForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  //initialValues: editData,
  validate,
})(PaymentMethodForm);

export default PaymentMethodForm;
