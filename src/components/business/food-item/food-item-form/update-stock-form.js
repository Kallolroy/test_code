import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import { green } from '@material-ui/core/colors';
import validate from './validate';
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import SaveIcon from '@material-ui/icons/Save';
import IxSwitchForm from '../../../basic/ix-switch-form';
import IxSelectField from '../../../basic/ix-selectfield';
import { Typography } from '@material-ui/core';
import { PLATFORM_ADMIN, COMPANY_ADMIN, BRANCH_ADMIN } from '../../../../constants/ix-user-roles'
import IxControlledAutoComplete from '../../../basic/ix-controlled-autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      '& input': {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.87)',
        fontWeight: 400,
      },
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  twoColumnRow: {
    display: 'flex',
  },
  childColumn: {
    width: '50%',
  },
  autocompleteWrapper: {
    margin: '8px 8px 24px 8px',
    boxSizing: 'content-box',
  },
  hrLine: {
    borderTop: '1px solid rgb(229,229,229)',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  hrBottom: {
    borderTop: '1px solid rgb(229,229,229)',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  description: {
    marginTop: theme.spacing(0.6),
    fontSize: '12px',
    color: 'rgba(0,0,0,0.54)',
  },
  activeSwitch: {
    fontSize: '16px',
    fontWeight: '400',
    color: 'rgba(0,0,0,.87)',
    marginLeft: '16px',
  },
}));

let UpdateStockForm = (props) => {
  const {
    handleSubmit,
    handleClose,
    pristine,
    reset,
    submitting,
    error,
    loading,
    initialValues,
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {

  }, []);


  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Box mb={1}>
          <Field
            name="currentStock"
            component={IxTextFieldForm}
            label={t('FoodItemForm.currentStock')}
          />
        </Box>

        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            {t('common.cancel_button')}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || submitting}
            color="secondary"
            startIcon={<SaveIcon />}
          >
            {t('common.save')}
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </DialogActions>
      </form>
    </>
  );
};

UpdateStockForm = reduxForm({
  form: 'UpdateStockForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate,
})(UpdateStockForm);


export default UpdateStockForm;
