import React, { useEffect, Suspense } from 'react';
import clsx from 'clsx';
import { Field, reduxForm } from 'redux-form'
import FormLabel from '@material-ui/core/FormLabel';
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

let MenuItemForm = (props) => {
  const { handleSubmit, handleClose, pristine, reset, submitting, loading } = props
  const classes = useStyles();
  const { t, i18n } = useTranslation()

  return (
    <form onSubmit={handleSubmit} >
      <Box>
        <Field
          name="name"
          component={IxTextFieldForm}
          label={t('TableForm.table_name')}
        />
      </Box>
      <Box>
        <Field name="tableNo" component={IxTextFieldForm} label={t('TableForm.table_number')} />
      </Box>
      <Box>
        <Field name="noOfSeats" component={IxTextFieldForm} label={t('TableForm.noOfSeats')} />
      </Box>
      <Box>
        <Typography variant="body2" gutterBottom>
        {t('TableForm.labels_1')}
      </Typography>
      </Box>
      <Box>
        <Link href="#" color="secondary">
         {t('TableForm.link_text')}
        </Link>
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
  )
}

MenuItemForm = reduxForm({
  form: 'MenuItemForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  //initialValues: editData,
  validate,
})(MenuItemForm)

export default MenuItemForm