import React, { useEffect, Suspense, useRef } from 'react';
import clsx from 'clsx';
import { connect, useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import IxSelectField from '../../../basic/ix-selectfield';
import DialogActions from '@material-ui/core/DialogActions';
import { deepOrange, green, grey } from '@material-ui/core/colors';
import validate from './validate';
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import IxSwitch from '../../../basic/ix-switch';
import IxFileUpload from '../../../basic/ix-upload-file';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';
import Tabs from '@material-ui/core/Tabs';
import config from '../../../../config';
import Tab from '@material-ui/core/Tab';

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

let FoodCategoryForm = (props) => {
  const {
    handleSubmit,
    handleClose,
    pristine,
    reset,
    submitting,
    parentCatData,
    initialValues,
  } = props;
  const classes = useStyles();
  const companyData = useSelector((state) => state.company.userCompany.data);
  const logoData = companyData ? companyData.logo : null;
  const [logo, setLogo] = React.useState(logoData);
  const user = JSON.parse(localStorage.getItem('user'));
  const [tabValue, setTabValue] = React.useState(0);
  const [parentCategory, setParentCategory] = React.useState(0);
  const { t, i18n } = useTranslation();

  const handleCapture = (event, input) => {
    let imageFile = event.target.files[0];
    props.change('imageFile', imageFile);

    if (imageFile) {
      const localImageUrl = URL.createObjectURL(imageFile);
      const imageObject = new window.Image();
      const data = new FormData();
      imageObject.onload = () => {
        data.append('file', imageFile);
        imageFile = data;
      };
      setLogo(localImageUrl);
    }
  };

  const clearLogo = () => {
    props.change('imageFile', null);
    setLogo(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    props.change('langType', newValue);
  };

  const handleParentCategoryChange = (event) => {
    setParentCategory(event.target.value);
  };

  const displayImage = async () => {
    if (initialValues.photo) {
      // const imageData = await getImageData(user.company.id, initialValues.photo);
      const imgSrc = `${config.api.base}/common/companies/${user.company.id}/images/${initialValues.photo}`;
      setLogo(imgSrc);
    }
  };

  useEffect(() => {
    displayImage();
  }, []);

  const renderTabs = ({
    input,
    label,
    meta: { touched, invalid, value, error },
    children,
    ...rest
  }) => {
    return (
      <Box mb={1}>
        <Tabs
          {...input}
          {...rest}
          value={tabValue}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleTabChange}
          aria-label="disabled tabs example"
        >
          <Tab
            label="ENGLISH"
            variant="fullWidth"
            style={{ 'min-width': '130px' }}
          />
          <Tab
            label="JAPANESE"
            variant="fullWidth"
            style={{ 'min-width': '130px' }}
          />
          <Tab
            label="KOREAN"
            variant="fullWidth"
            style={{ 'min-width': '130px' }}
          />
          <Tab
            label="CHINESE"
            variant="fullWidth"
            style={{ 'min-width': '130px' }}
          />
        </Tabs>
      </Box>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box mb={1}>
        <Field name="langTab" component={renderTabs} />
      </Box>
      <Box>
        <Field
          name="parentId"
          component={IxSelectField}
          label={t('FoodCategoryForm.parent_category')}
          onChange={handleParentCategoryChange}
        >
          <option value={0}>{'No Parent'}</option>
          {parentCatData.map((pc, index) => {
            return <option value={pc.id}>{pc.name['en-US']}</option>;
          })}
        </Field>
      </Box>
      <Box mb={1}>
        {tabValue === 0 && (
          <Field
            name="name_en"
            component={IxTextFieldForm}
            label={t('FoodCategoryForm.name')}
          />
        )}
        {tabValue === 1 && (
          <Field
            name="name_ja"
            // style={{ display: tabValue === 1 ? 'block' : 'none' }}
            component={IxTextFieldForm}
            label={t('FoodCategoryForm.name')}
          />
        )}
        {tabValue === 2 && (
          <Field
            name="name_ko"
            component={IxTextFieldForm}
            label={t('FoodCategoryForm.name')}
          />
        )}
        {tabValue === 3 && (
          <Field
            name="name_zh"
            component={IxTextFieldForm}
            label={t('FoodCategoryForm.name')}
          />
        )}
      </Box>
      <Box>
        {tabValue === 0 && (
          <Field
            name="description_en"
            component={IxTextFieldForm}
            multiline
            rows={4}
            label={t('FoodCategoryForm.description')}
          />
        )}
        {tabValue === 1 && (
          <Field
            name="description_ja"
            // style={{ display: tabValue === 1 ? 'block' : 'none' }}
            component={IxTextFieldForm}
            multiline
            rows={4}
            label={t('FoodCategoryForm.description')}
          />
        )}
        {tabValue === 2 && (
          <Field
            name="description_ko"
            component={IxTextFieldForm}
            multiline
            rows={4}
            label={t('FoodCategoryForm.description')}
          />
        )}
        {tabValue === 3 && (
          <Field
            name="description_zh"
            component={IxTextFieldForm}
            multiline
            rows={4}
            label={t('FoodCategoryForm.description')}
          />
        )}
      </Box>

      <Box m={1} display="flex">
        <Box>
          <FormLabel component="legend" ml={1}>
            {t('FoodCategoryForm.CategoryLogoImage')}
          </FormLabel>
          <Box width="50%" mt={1}>
            <Avatar
              variant="rounded"
              className={clsx(classes.rounded, classes.large)}
            >
              <Field
                name="logodisplay"
                component="img"
                src={logo}
                className={clsx(classes.rounded, classes.large)}
              />
            </Avatar>
          </Box>
        </Box>
        <Box mt={2} ml={2}>
          <Box mb={5}>
            <Typography variant="body2" gutterBottom>
              {t('FoodCategoryForm.CategoryLogoImageLabel_1')}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('common.imageLabel_2')}
            </Typography>
          </Box>

          <DialogActions style={{ 'justify-content': 'flex-start' }}>
            <Field
              name="category_logo"
              type="file"
              component={IxFileUpload}
              id="category_logo"
              label={t('common.add_image')}
              onChange={handleCapture}
            ></Field>
            <Button variant="contained" onClick={clearLogo}>
              {t('common.remove')}
            </Button>
          </DialogActions>
        </Box>
      </Box>

      <DialogActions>
        <Box width="70%">
          <Field
            name="isActive"
            component={IxSwitch}
            label={t('common.active')}
          ></Field>
        </Box>
        <Button variant="contained" onClick={handleClose}>
          {t('common.cancel_button')}
        </Button>
        <Button type="submit" variant="contained" color="secondary">
          {t('common.submit_button')}
        </Button>
      </DialogActions>
    </form>
  );
};

FoodCategoryForm = reduxForm({
  form: 'FoodCategoryForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate,
})(FoodCategoryForm);

export default FoodCategoryForm;
