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
import IxSwitch from '../../../basic/ix-switch';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

let CompanyForm = (props) => {
  const { handleSubmit, handleClose, pristine, reset, submitting, loading } = props
  const [expandedUserDetails, setExpandedUserDetails] = React.useState(true);
  const [isSendEmail, setIsSendEmail] = React.useState(true);
  const classes = useStyles();
  const { t, i18n } = useTranslation()

  const handleExpandedUserDetailsClick = () => {
    setExpandedUserDetails(!expandedUserDetails);
  };

  const handleSendEmailChange = (event) => {
    setIsSendEmail(event.target.checked)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Field
          name="name"
          component={IxTextFieldForm}
          label={t('CompanyForm.CompanyName')}
        />
      </Box>
      <Box>
        <Field name="address" component={IxTextFieldForm} label={t('CompanyForm.Address')} />
      </Box>
      <Box>
        <Field name="userEmail" component={IxTextFieldForm} label={t('CompanyForm.Email')} />
      </Box>
      <Box>
        <Field name="phone" component={IxTextFieldForm} label={t('CompanyForm.Phone')} />
      </Box>
      <Box display="flex">
        <Box width="50%">
          <Field
            name="allowableBranches"
            component={IxTextFieldForm}
            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            label={t('CompanyForm.AllowableBranches')} />
        </Box>
        <Box width="50%">
          <Field name="allowableUsers" component={IxTextFieldForm} label={t('CompanyForm.AllowableUsers')} />
        </Box>
      </Box>

      <Box display="flex">
        <Box width="90%" pt={2} pl={1}>
          <Typography paragraph variant="paragraph">{t('CompanyForm.UserDetails')}</Typography>
        </Box>
        <Box>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expandedUserDetails,
            })}
            onClick={handleExpandedUserDetailsClick}
            aria-expanded={expandedUserDetails}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Box>
      <Collapse in={expandedUserDetails} timeout="auto">
        <Box display="flex">
          <Box width="50%">
            <Field name="userName" component={IxTextFieldForm} label={t('signin.UserName')} />
          </Box>
          <Box width="50%">
            <Field name="email" component={IxTextFieldForm} label={t('CompanyForm.Email')} />
          </Box>
        </Box>
        <Box display="flex">
          <Box width="50%">
            <Field name="firstName" component={IxTextFieldForm} label={t('CompanyForm.FirstName')} />
          </Box>
          <Box width="50%">
            <Field name="lastName" component={IxTextFieldForm} label={t('CompanyForm.LastName')} />
          </Box>
        </Box>
        <Box display="flex">
          <Box width="50%">
            <Field name="password" component={IxTextFieldForm} label={t('signin.Password')} />
          </Box>
          <Box width="50%">
            <Field name="confirmPassword" component={IxTextFieldForm} label={t('CompanyForm.confirmPassword')} />
          </Box>
        </Box>
      </Collapse>
      <Box ml={1}>
        <FormControlLabel
          control={<Checkbox name="isSendEmail"
            checked={isSendEmail}
            onChange={handleSendEmailChange} />}
          label={t('CompanyForm.sendEmailPassword')} />
      </Box>
      <DialogActions>
        <Box width="70%">
          <Field name="isActive" component={IxSwitch} label={t('common.active')}></Field>
        </Box>
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

CompanyForm = reduxForm({
  form: 'CompanyForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  //initialValues: editData,
  validate,
})(CompanyForm)

export default CompanyForm