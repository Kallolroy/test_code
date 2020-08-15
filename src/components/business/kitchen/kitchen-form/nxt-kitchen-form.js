import React, { useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { Field, reduxForm } from 'redux-form'
import IxSelectField from '../../../basic/ix-selectfield';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import DialogActions from '@material-ui/core/DialogActions';
import { deepOrange, green, grey } from '@material-ui/core/colors';
import validate from './validate'
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import IxSwitch from '../../../basic/ix-switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
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

let KitchenForm = (props) => {
  const { handleSubmit, handleClose, pristine, reset, submitting, branches, loading } = props
  const classes = useStyles();
  const { t, i18n } = useTranslation()

  return (
    <form onSubmit={handleSubmit} >
      <Box>
        <Field
          name="name"
          component={IxTextFieldForm}
          // label={t('TableForm.table_name')}
          label={t('IxLeftBarMenu.Kitchens')}
        />
      </Box>
      {branches && <Box>
        <Field
          name="branchId"
          component={IxSelectField}
          label={t('common.branch')}
        >
          {branches.map((branch, index) => {
            return <option value={branch.id}>{branch.name}</option>
          })}
        </Field>
      </Box>}

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
  )
}

KitchenForm = reduxForm({
  form: 'KitchenForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  //initialValues: editData,
  validate,
})(KitchenForm)

export default KitchenForm