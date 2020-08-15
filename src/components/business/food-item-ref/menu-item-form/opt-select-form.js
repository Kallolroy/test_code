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
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox';
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

let OptSelectForm = (props) => {
  const {
    handleSubmit,
    handleClose,
    pristine,
    reset,
    submitting,
    error,
    loading,
    initialValues,
    menuItemUpdateData
  } = props;
  const classes = useStyles();
  const { t } = useTranslation();
  const [optsSate, setOptsSate] = React.useState([]);

  const handleOptChange = (event) => {
    const optsList = [...optsSate];
    if (event.target.checked) {
      optsList.push(Number(event.target.name))
    } else {
      let optListId = optsList.find((OptId) => OptId === Number(event.target.name))
      if (optListId) {
        optsList.splice(optsList.findIndex(function (optId) {
          return optId === optListId;
        }), 1);
      }
    }
    setOptsSate(optsList);
    props.change("optsSate",optsList);
  }

  const timeFormater = (time) => {
    let timeHour = time.split('T')[1] ? time.split('T')[1].substring(0, 5) : time
    let [hours, minutes] = timeHour.split(":");

    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  useEffect(() => {

  }, []);


  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Box ml={1}>
          {menuItemUpdateData && menuItemUpdateData.operationSlots && menuItemUpdateData.operationSlots.map((optSlot, index) => {

            return (
              <FormControlLabel
                control={<Checkbox name={optSlot.id} onChange={handleOptChange} />}
                label={`${optSlot.name}(Everyday :${timeFormater(optSlot.startTime)} -${timeFormater(optSlot.endTime)}`} />
            )
          })}
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
            {'Update Status'}
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </DialogActions>
      </form>
    </>
  );
};

OptSelectForm = reduxForm({
  form: 'OptSelectForm',
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate,
})(OptSelectForm);


export default OptSelectForm;
