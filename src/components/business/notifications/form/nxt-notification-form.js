import React, { useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { Field, reduxForm } from 'redux-form'
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { connect, useSelector } from 'react-redux'
import DialogActions from '@material-ui/core/DialogActions';
import { deepOrange, green, grey } from '@material-ui/core/colors';
import validate from './validate'
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import IxSelectField from '../../../basic/ix-selectfield';
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

let NotificationForm = (props) => {
  const { handleSubmit, handleClose, companies, pristine, reset, submitting, loading } = props
  const classes = useStyles();
  const { t, i18n } = useTranslation()


  return (
    <form onSubmit={handleSubmit}>
      <Box width="30%">
        <Field
          name="companyId"
          component={IxSelectField}
          label={t('NotificationForm.Recipient')}
        >
          <option value={'ALL_COMPANIES'}>ALL_COMPANIES</option>
          {companies && companies.map((comp, index) => {
            return <option value={comp.id}>{comp.name}</option>
          })}
        </Field>
      </Box>
      <Box>
        <Field name="subject" component={IxTextFieldForm} label={t('NotificationForm.Subject')} />
      </Box>
      <Box>
        <Field name="body" multiline rows={10} component={IxTextFieldForm} label={t('NotificationForm.Message')} />
      </Box>

      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          {t('common.cancel_button')}
        </Button>
        <Button type="submit" variant="contained" color="secondary">
          {t('common.submit_button')}
        </Button>
      </DialogActions>
    </form>
  )
}

NotificationForm = reduxForm({
  form: 'NotificationForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  //initialValues: editData,
  validate,
})(NotificationForm)

export default NotificationForm