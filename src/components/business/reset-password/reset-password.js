import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import ResetPasswordValidate from './reset-password-validation';
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

const renderField = ({
  input,
  label,
  meta: { touched, invalid, error },
  ...custom
}) => (
    <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      autoComplete={label}
      // autoFocus
      // InputProps={{
      //   startAdornment: (
      //     <InputAdornment position="start">
      //       <AccountCircle />
      //     </InputAdornment>
      //   ),
      // }}
      {...input}
      {...custom} />
  )

const ResetPassword = props => {
  const { handleSubmit } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation()


  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Typography variant="caption" display="block" gutterBottom>
        {t('forgotPassword.label_2')}
      </Typography>
      <Field name="email" component={renderField} label={t('common.Email')} />
      <Box my={3}>
        <Grid container>
          <Grid item xs>
            <NavLink activeClassName="active" className={classes.link} to="/login">
              {t('forgotPassword.Remember_password')}
            </NavLink>
          </Grid>
          <Grid item>
            <IxButton type="submit" label={t('forgotPassword.SendLink')}></IxButton>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default reduxForm({
  form: 'ResetPassword', //                 <------ same form name
  destroyOnUnmount: true, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: ResetPasswordValidate,
})(ResetPassword);