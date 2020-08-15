import React from 'react';
import IxTextFieldForm from '../../basic/ix-text-field-form';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import ForgotPasswordValidate from './forgot-password-validation';
import { IxButton } from '../../basic/ix-button';
import { NavLink, BrowserRouter as Router } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles(theme => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: '#ef6c00',
    'text-decoration': 'none',
  }
}));


const ForgotPassword = props => {
  const { handleSubmit } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation()

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Box >
        <Field name="password" component={IxTextFieldForm} label={t('signin.Password')} />
      </Box>
      <Box mt={1}>
        <Field name="confirmPassword" component={IxTextFieldForm} label={t('CompanyForm.confirmPassword')} />
      </Box>

      <Box my={3}>
        <Grid container>
          <Grid item xs>
            <NavLink activeClassName="active" className={classes.link} to="/login">
            {t('forgotPassword.Remember_password')}
            </NavLink>
          </Grid>
          <Grid item>
            <IxButton type="submit" label="Save"></IxButton>
          </Grid>
        </Grid>
      </Box>
    </form >
  );
}

export default reduxForm({
  form: 'ForgotPassword', //                 <------ same form name
  destroyOnUnmount: true, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: ForgotPasswordValidate,
})(ForgotPassword);