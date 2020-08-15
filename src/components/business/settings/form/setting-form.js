import React, { useEffect, Suspense, useRef } from 'react';
import clsx from 'clsx';
import { Field, FieldArray, reduxForm } from 'redux-form';
import IxSelectField from '../../../basic/ix-selectfield';
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
import InfoIcon from '@material-ui/icons/Info';

import { useTranslation } from 'react-i18next';
import _ from 'lodash';

let SettingForm = (props) => {
  const {
    handleSubmit,
    handleClose,
    pristine,
    reset,
    submitting,
    error,
    loading,
    initialValues,
    languageList,
    companySettingData,
  } = props;

  const classes = useStyles();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (companySettingData) {
      const TABLE_CHARGES = companySettingData.find(
        (s) => s.configName === 'TABLE_CHARGES'
      );
      if (TABLE_CHARGES) {
        props.change(
          'TABLE_CHARGES',
          TABLE_CHARGES.configValue ? Number(TABLE_CHARGES.configValue) : 0
        );
        props.change('TABLE_CHARGES_ID', TABLE_CHARGES.id);
      }

      const EAT_IN_TAX = companySettingData.find(
        (s) => s.configName === 'EAT_IN_TAX'
      );
      if (EAT_IN_TAX) {
        props.change(
          'EAT_IN_TAX',
          EAT_IN_TAX.configValue ? Number(EAT_IN_TAX.configValue) : 0
        );
        props.change('EAT_IN_TAX_ID', EAT_IN_TAX.id);
      }

      const TAKE_AWAY_TAX = companySettingData.find(
        (s) => s.configName === 'TAKE_AWAY_TAX'
      );
      if (TAKE_AWAY_TAX) {
        props.change(
          'TAKE_AWAY_TAX',
          TAKE_AWAY_TAX.configValue ? Number(TAKE_AWAY_TAX.configValue) : 0
        );
        props.change('TAKE_AWAY_TAX_ID', TAKE_AWAY_TAX.id);
      }

      const KIDS_DISCOUNT = companySettingData.find(
        (s) => s.configName === 'KIDS_DISCOUNT'
      );
      if (KIDS_DISCOUNT) {
        props.change(
          'KIDS_DISCOUNT',
          KIDS_DISCOUNT.configValue ? Number(KIDS_DISCOUNT.configValue) : 0
        );
        props.change('KIDS_DISCOUNT_ID', KIDS_DISCOUNT.id);
      }

      const DEFAULT_LANGUAGE = companySettingData.find(
        (s) => s.configName === 'DEFAULT_LANGUAGE'
      );
      if (DEFAULT_LANGUAGE) {
        props.change('DEFAULT_LANGUAGE', DEFAULT_LANGUAGE.configValue);
        props.change('DEFAULT_LANGUAGE_ID', DEFAULT_LANGUAGE.id);
      }

      const DAILY_STOCK_UPDATE = companySettingData.find(
        (s) => s.configName === 'DAILY_STOCK_UPDATE'
      );
      if (DAILY_STOCK_UPDATE) {
        props.change(
          'DAILY_STOCK_UPDATE',
          DAILY_STOCK_UPDATE.configValue === 'true'
        );
        props.change('DAILY_STOCK_UPDATE_ID', DAILY_STOCK_UPDATE.id);
      }
    }
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.name}>
        <Box
          display={'flex'}
          width="70%"
          ml={1}
          mt={2}
          pt={1}
          border={1}
          borderColor="grey.400"
          borderRadius={4}
        >
          <Box mx={2}>
            <InfoIcon color="secondary"></InfoIcon>
          </Box>

          <Typography
            variant="caption"
            display="block"
            gutterBottom
            style={{ 'font-size': '10px' }}
          >
            {t('SettingForm.message')}
          </Typography>
        </Box>
        <Box width="90%" pt={2} pl={1}>
          <Typography paragraph variant="paragraph">
            {t('SettingForm.Charges')}
          </Typography>
        </Box>
        <Box width="30%">
          <Field
            name="TABLE_CHARGES"
            component={IxTextFieldForm}
            label={t('SettingForm.tableCharge')}
          />
        </Box>
        <Box width="90%" pt={2} pl={1}>
          <Typography paragraph variant="paragraph">
            {t('SettingForm.Taxes')}
          </Typography>
        </Box>
        <Box width="30%">
          <Field
            name="EAT_IN_TAX"
            component={IxTextFieldForm}
            label={t('SettingForm.dineInTax')}
          />
        </Box>
        <Box width="30%">
          <Field
            name="TAKE_AWAY_TAX"
            component={IxTextFieldForm}
            label={t('SettingForm.takeOutTax')}
          />
        </Box>
        <Box width="90%" pt={2} pl={1}>
          <Typography paragraph variant="paragraph">
            {t('SettingForm.Discounts')}
          </Typography>
        </Box>
        <Box width="30%">
          <Field
            name="KIDS_DISCOUNT"
            component={IxTextFieldForm}
            label={t('SettingForm.kidsDiscount')}
          />
        </Box>
        <Box width="90%" pt={2} pl={1}>
          <Typography paragraph variant="paragraph">
            {t('SettingForm.language')}
          </Typography>
        </Box>

        <Box width="30%" className="inputFields dropdownField">
          <Field
            name="DEFAULT_LANGUAGE"
            component={IxSelectField}
            label={t('SettingForm.defaultLanguage')}
          >
            {languageList.data.map((language, index) => {
              return (
                <option value={language.langCode}>{language.langCode}</option>
              );
            })}
          </Field>
        </Box>

        <Box width="90%" pt={2} pl={1}>
          <Typography paragraph variant="paragraph">
            {t('SettingForm.dailyStockUpdate')}
          </Typography>
        </Box>
        <Box width="30%" ml={2}>
          <Field
            name="DAILY_STOCK_UPDATE"
            component={IxSwitch}
            label={t('SettingForm.dailyStockUpdate')}
          ></Field>
        </Box>
        <DialogActions>
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

SettingForm = reduxForm({
  form: 'SettingForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  //initialValues: editData,
  validate,
})(SettingForm);

export default SettingForm;
