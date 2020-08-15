import React, { useEffect, Suspense, useRef } from 'react';
import clsx from 'clsx';
import { Field, FieldArray, reduxForm } from 'redux-form'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import { deepOrange, green, grey } from '@material-ui/core/colors';
import validate from './validate'
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import IxSwitch from '../../../basic/ix-switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import config from '../../../../config';
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  square: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
  },
  rounded: {
    color: '#fff',
    backgroundColor: grey[500],
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


let MenuOverrideForm = (props) => {
  const { handleSubmit, handleClose, pristine, reset, submitting, error, loading, optSlotsData, initialValues, branches } = props
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  // const [langTypeValue, setLangTypeValue] = React.useState('en');

  const user = JSON.parse(localStorage.getItem('user'));


  useEffect(() => {

  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.name}>

        <Box p={1}>
          <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }} >
            This will enable editing capability for the selected company menu along with all it’s menu items in the current store. You
            can then go in and Edit/Delete individual menu items or the menu itself as you need.
            After overriding, any updates made in the company level for it will not effect this menu or any of it’s menu items.
            </Typography>
        </Box>

        <DialogActions>
          <Box width="70%">
            <Field name="isActive" component={IxSwitch} label={t('common.active')}></Field>
          </Box>
          <Button variant="contained" onClick={handleClose}>
            {t('common.cancel_button')}
          </Button>
          <Button type="submit" variant="contained" disabled={loading} color="secondary">
            {t('common.submit_button')}
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </DialogActions>
      </form >
    </>
  )
}

MenuOverrideForm = reduxForm({
  form: 'MenuOverrideForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  //initialValues: editData,
  validate,
})(MenuOverrideForm)

export default MenuOverrideForm