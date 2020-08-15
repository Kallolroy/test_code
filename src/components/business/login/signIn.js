import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import SignInValidate from './signin-validation';
import { IxButton } from './../../basic/ix-button';
import { NavLink, BrowserRouter as Router } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
  handleClickShowPassword,
  input,
  label,
  isPassword,
  meta: { touched, invalid, error },
  ...custom
}) => {

  const opt = {
  }
  input.name === 'password' && (opt.endAdornment = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        onClick={handleClickShowPassword}
        // onMouseDown={handleMouseDownPassword}
        edge="end"
      >
        {isPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  ))

  return <TextField
    variant="outlined"
    margin="normal"
    fullWidth
    label={label}
    error={touched && invalid}
    helperText={touched && error}
    autoComplete={label}
    InputProps={opt}
    {...input}
    {...custom} />
}


const SignIn = props => {
  const { handleSubmit } = props;
  const classes = useStyles();
  const { t, i18n } = useTranslation()
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field name="userEmail" component={renderField} label={t('signin.UserName')} />
      <Field name="password"
        isPassword={showPassword}
        component={renderField}
        label={t('signin.Password')}
        type={showPassword ? 'text' : 'password'}
        handleClickShowPassword = {handleClickShowPassword}
      />
      <Box my={3}>
        <Grid container>
          <Grid item xs>
            <NavLink activeClassName="active" className={classes.link} to="/resetpassword">
              {t('signin.lostpassword')}
            </NavLink>
          </Grid>
          <Grid item>
            <IxButton type="submit" label={t('signin.CONTINUE')}></IxButton>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default reduxForm({
  form: 'SignIn', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate: SignInValidate,
})(SignIn);