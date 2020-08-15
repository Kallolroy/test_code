import React, { useEffect, Suspense, useRef } from 'react';
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
import IxFileUpload from '../../../basic/ix-upload-file';
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
}));

let CompanyForm = props => {
  const { handleSubmit, handleClose, pristine, reset, submitting, initialValues } = props
  const classes = useStyles();
  const companyData = useSelector(state => state.company.userCompany.data)
  const logoData = companyData ? companyData.logo : null
  const [logo, setLogo] = React.useState(logoData);
  const user = JSON.parse(localStorage.getItem('user'));
  const { t, i18n } = useTranslation()

  const handleCapture = (event, input) => {
    let imageFile = event.target.files[0];
    props.change("imageFile", imageFile)
    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();
      const data = new FormData()
      imageObject.onload = () => {
        data.append('file', imageFile)
        imageFile = data;
      }
      setLogo(localImageUrl)
    }
  };

  const clearLogo = () => {
    props.change("imageFile", null)
    setLogo(null);
  }

  const displayImage = async () => {
    if (initialValues.logo) {
      // const imageData = await getImageData(user.company.id, initialValues.photo);
      const imgSrc = `${config.api.base}/common/companies/${user.company.id}/images/${initialValues.logo}`
      setLogo(imgSrc)
    }
  }

  useEffect(() => {
    displayImage()
  }, []);

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
        <Field name="email" component={IxTextFieldForm} label={t('CompanyForm.Email')} />
      </Box>
      <Box>
        <Field name="phone" component={IxTextFieldForm} label={t('CompanyForm.Phone')} />
      </Box>
      <Box display="flex">
        <Box width="50%">
          <Field name="allowableBranches" disabled={true} component={IxTextFieldForm} label={t('CompanyForm.AllowableBranches')} />
        </Box>
        <Box width="50%">
          <Field name="allowableUsers" disabled={true} component={IxTextFieldForm} label={t('CompanyForm.AllowableUsers')} />
        </Box>
      </Box>
      <Box m={1} mb={5} display="flex">
        <Box>
          <FormLabel component="legend" ml={1}>{t('CompanyForm.CompanyLogoImage')}</FormLabel>
          <Box width="50%" mt={1}>
            <Avatar variant="rounded" className={clsx(classes.rounded, classes.large)}>
              <Field name="logodisplay" component="img" src={logo} className={clsx(classes.rounded, classes.large)} />
            </Avatar>
          </Box>
        </Box>
        <Box mt={2} ml={2} >
          <Box mb={5}>
            <Typography variant="body2" gutterBottom>
              {t('CompanyForm.CompanyLogoLabel_1')}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('common.imageLabel_2')}
            </Typography>
          </Box>

          <DialogActions style={{ "justify-content": "flex-start" }}>
            <Field name="companyLogo" type="file" component={IxFileUpload} id="company_logo" label={t('common.add_image')} onChange={handleCapture}></Field>
            <Button variant="contained" onClick={clearLogo}>{t('common.remove')}</Button>
          </DialogActions>
        </Box>
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
  validate,
})(CompanyForm)

CompanyForm = connect(
  state => ({
    initialValues: state.company.userCompany.data // pull initial values from account reducer
  }),
  //{ load: loadAccount } // bind account loading action creator
)(CompanyForm)

export default CompanyForm