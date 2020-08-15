import React, { useEffect, Suspense, useRef } from 'react';
import clsx from 'clsx';
import { Field, FieldArray, reduxForm } from 'redux-form'
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import DialogActions from '@material-ui/core/DialogActions';
import { deepOrange, green, grey } from '@material-ui/core/colors';
import validate from './validate'
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import IxSelectField from '../../../basic/ix-selectfield';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import IxSwitch from '../../../basic/ix-switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import IxFileUpload from '../../../basic/ix-upload-file';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { getImageData } from './../../../../services/img-service';
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));


let FoodItemForm = (props) => {
  const { handleSubmit, handleClose, pristine, reset, submitting, error, loading, optSlotsData, initialValues } = props
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const user = JSON.parse(localStorage.getItem('user'));
  const [expandedDetail, setExpandedDetail] = React.useState(true);
  const [expandedPhoto, setExpandedPhoto] = React.useState(true);
  const [expandedFeatures, setExpandedFeatures] = React.useState(true);
  const [expandedPreparation, setExpandedPreparation] = React.useState(true);
  const [expandedNutrition, setExpandedNutrition] = React.useState(true);
  const [expandedPrice, setExpandedPrice] = React.useState(true);

  const [feature, setFeature] = React.useState({
    isVeg: initialValues.isVeg,
    isHalal: initialValues.isHalal,
    isAlcoholAdded: initialValues.isAlcoholAdded,
    isKidItem: initialValues.isKidItem,
  });

  const handleChange = (event) => {
    props.change(event.target.name, event.target.checked);
    setFeature({ ...feature, [event.target.name]: event.target.checked });
  };

  const [tabValue, setTabValue] = React.useState(0);
  const [logo, setLogo] = React.useState(null);

  const displayImage = async () => {
    if (initialValues.photo) {
      // const imageData = await getImageData(user.company.id, initialValues.photo);

      const imgSrc = `${config.api.base}/common/companies/${user.company.id}/images/${initialValues.photo}`
      setLogo(imgSrc)

    }
  }

  useEffect(() => {
    displayImage()
  }, []);

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

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExpandDetailClick = () => {
    setExpandedDetail(!expandedDetail);
  };

  const handleExpandPhotoClick = () => {
    setExpandedPhoto(!expandedPhoto);
  };

  const handleExpandExpandedFeatureClick = () => {
    setExpandedFeatures(!expandedFeatures);
  };

  const handleExpandPreparationClick = () => {
    setExpandedPreparation(!expandedPreparation);
  };

  const handleExpandNutritionClick = () => {
    setExpandedNutrition(!expandedNutrition);
  };

  const handleExpandedPriceClick = () => {
    setExpandedPrice(!expandedPrice);
  };


  const renderTabs = ({ input, label, meta: { touched, invalid, value, error }, children, ...rest }) => {
    return (
      <Box mb={1}>
        <Tabs {...input} {...rest}
          value={tabValue}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleTabChange}
          aria-label="disabled tabs example"
        >
          <Tab label="ENGLISH" variant="fullWidth" style={{ 'min-width': '130px' }} />
          <Tab label="JAPANESE" variant="fullWidth" style={{ 'min-width': '130px' }} />
          <Tab label="KOREAN" variant="fullWidth" style={{ 'min-width': '130px' }} />
          <Tab label="CHINESE" variant="fullWidth" style={{ 'min-width': '130px' }} />
        </Tabs>
      </Box>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.name}>
        <Box mb={1}>
          <Field
            name="langTab"
            component={renderTabs}
          />
        </Box>

        <Box display="flex">
          <Box width="90%" pt={2} pl={1}>
            <Typography paragraph variant="paragraph">{t('FoodItemForm.details')}</Typography>
          </Box>
          <Box>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expandedDetail,
              })}
              onClick={handleExpandDetailClick}
              aria-expanded={expandedDetail}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>

        <Collapse in={expandedDetail} timeout="auto">
          <Box display="flex">
            <Box mb={1} width="70%">
              {tabValue === 0 && <Field
                name="name_en"
                component={IxTextFieldForm}
                label={t('FoodItemForm.name')}
              />}
              {tabValue === 1 && <Field
                name="name_ja"
                // style={{ display: tabValue === 1 ? 'block' : 'none' }}
                component={IxTextFieldForm}
                label={t('FoodItemForm.name')}
              />}
              {tabValue === 2 && <Field
                name="name_ko"
                component={IxTextFieldForm}
                label={t('FoodItemForm.name')}
              />}
              {tabValue === 3 && <Field
                name="name_zh"
                component={IxTextFieldForm}
                label={t('FoodItemForm.name')}
              />}
            </Box>
            <Box width="30%">
              {tabValue === 0 && <Field
                name="printableName_en"
                component={IxTextFieldForm}
                label={t('FoodItemForm.printableName')}
              />
              }
              {tabValue === 1 && <Field
                name="printableName_ja"
                component={IxTextFieldForm}
                label={t('FoodItemForm.printableName')}
              />
              }
              {tabValue === 2 && <Field
                name="printableName_ko"
                component={IxTextFieldForm}
                label={t('FoodItemForm.printableName')}
              />
              }
              {tabValue === 3 && <Field
                name="printableName_zh"
                component={IxTextFieldForm}
                label={t('FoodItemForm.printableName')}
              />
              }
            </Box>
          </Box>
          <Box>
            {tabValue === 0 && <Field
              name="ingredients_en"
              component={IxTextFieldForm}
              label={t('FoodItemForm.Ingredients')}
            />}
            {tabValue === 1 && <Field
              name="ingredients_ja"
              component={IxTextFieldForm}
              label={t('FoodItemForm.Ingredients')}
            />}
            {tabValue === 2 && <Field
              name="ingredients_ko"
              component={IxTextFieldForm}
              label={t('FoodItemForm.Ingredients')}
            />}
            {tabValue === 3 && <Field
              name="ingredients_zh"
              component={IxTextFieldForm}
              label={t('FoodItemForm.Ingredients')}
            />}
          </Box>
          <Box>
            {tabValue === 0 && <Field
              name="description_en"
              multiline
              rows={2}
              component={IxTextFieldForm}
              label={t('FoodItemForm.Description')}
            />}
            {tabValue === 1 && <Field
              name="description_ja"
              multiline
              rows={2}
              component={IxTextFieldForm}
              label={t('FoodItemForm.Description')}
            />}
            {tabValue === 2 && <Field
              name="description_ko"
              multiline
              rows={2}
              component={IxTextFieldForm}
              label={t('FoodItemForm.Description')}
            />}
            {tabValue === 3 && <Field
              name="description_zh"
              multiline
              rows={2}
              component={IxTextFieldForm}
              label={t('FoodItemForm.Description')}
            />}
          </Box>
        </Collapse>

        <Box display="flex">
          <Box width="90%" pt={2} pl={1}>
            <Typography paragraph variant="paragraph">{t('FoodItemForm.image')}</Typography>
          </Box>
          <Box>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expandedPhoto,
              })}
              onClick={handleExpandPhotoClick}
              aria-expanded={expandedPhoto}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>

        <Collapse in={expandedPhoto} timeout="auto">
          <Box m={1} display="flex">
            <Box>
              <FormLabel component="legend" ml={1}>{t('FoodItemForm.image')}</FormLabel>
              <Box width="50%" mt={1}>
                <Avatar variant="rounded" className={clsx(classes.rounded, classes.large)}>
                  <Field name="foodItemImg" component="img" src={logo} className={clsx(classes.rounded, classes.large)} />
                </Avatar>
              </Box>
            </Box>
            <Box mt={2} ml={2} >
              <Box mb={7}>
                <Typography variant="body2" gutterBottom>
                  {t('FoodCategoryForm.CategoryLogoImageLabel_1')}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {t('common.imageLabel_2')}
                </Typography>
              </Box>

              <DialogActions style={{ "justify-content": "flex-start" }}>
                <Field name="foodItemPhoto" type="file" component={IxFileUpload} id="category_logo" label={t('common.add_image')} onChange={handleCapture}></Field>
                <Button variant="contained" onClick={clearLogo}>{t('common.remove')}</Button>
              </DialogActions>
            </Box>
          </Box>
        </Collapse>

        <Box display="flex">
          <Box width="90%" pt={2} pl={1}>
            <Typography paragraph variant="paragraph">{t('FoodItemForm.features')}</Typography>
          </Box>
          <Box>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expandedFeatures,
              })}
              onClick={handleExpandExpandedFeatureClick}
              aria-expanded={expandedFeatures}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>
        <Collapse in={expandedFeatures} timeout="auto">
          <Box ml={1}>
            <FormLabel component="legend" >{t('FoodItemForm.features')}</FormLabel>
          </Box>
          <Box ml={1}>
            <FormControlLabel control={<Checkbox name="isVeg" checked={feature.isVeg} onChange={handleChange} />} label={t('NxtFoodItemHome.is_veg')} />
            <FormControlLabel control={<Checkbox name="isHalal" checked={feature.isHalal} onChange={handleChange} />} label={t('NxtFoodItemHome.is_halal')} />
            <FormControlLabel control={<Checkbox name="isAlcoholAdded" checked={feature.isAlcoholAdded} onChange={handleChange} />} label={t('NxtFoodItemHome.is_alcohol')} />
            <FormControlLabel control={<Checkbox name="isKidItem" checked={feature.isKidItem} onChange={handleChange} />} label={t('NxtFoodItemHome.is_kid')} />
          </Box>
        </Collapse>

        <Box display="flex">
          <Box width="90%" pt={2} pl={1}>
            <Typography paragraph variant="paragraph">{t('NxtFoodItemHome.preparation')}</Typography>
          </Box>
          <Box>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expandedPreparation,
              })}
              onClick={handleExpandPreparationClick}
              aria-expanded={expandedPreparation}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>
        <Collapse in={expandedPreparation} timeout="auto">
          <Box display="flex" >
            <Box width="30%">
              <Field
                name="prepareDuration"
                component={IxTextFieldForm}
                label={t('NxtFoodItemHome.preparation')}
              />
            </Box>
            <Box width="70%" p={1}>
              <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }}>
               {t('NxtFoodItemHome.preparation_message')}
            </Typography>
            </Box>
          </Box>

        </Collapse>

        <Box display="flex">
          <Box width="90%" pt={2} pl={1}>
            <Typography paragraph variant="paragraph">Nutrition Information</Typography>
          </Box>
          <Box>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expandedNutrition,
              })}
              onClick={handleExpandNutritionClick}
              aria-expanded={expandedNutrition}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>
        <Collapse in={expandedNutrition} timeout="auto">
          <Box display="flex">
            <Box mb={1} width="30%">
              <Field
                name="calorie"
                component={IxTextFieldForm}
                label={t('FoodItemForm.Calories')}
              />
            </Box>
            <Box mb={1}>
              {tabValue === 0 &&
                <Field
                  name="allergyInfo_en"
                  component={IxTextFieldForm}
                  label={t('FoodItemForm.allergyInfo')}
                />
              }
              {tabValue === 1 &&
                <Field
                  name="allergyInfo_ja"
                  component={IxTextFieldForm}
                  label={t('FoodItemForm.allergyInfo')}
                />
              }
              {tabValue === 2 &&
                <Field
                  name="allergyInfo_ko"
                  component={IxTextFieldForm}
                  label={t('FoodItemForm.allergyInfo')}
                />
              }
              {tabValue === 3 &&
                <Field
                  name="allergyInfo_zh"
                  component={IxTextFieldForm}
                  label={t('FoodItemForm.allergyInfo')}
                />
              }
            </Box>
          </Box>
          <Box>
            {tabValue === 0 && <Field
              name="nutritionInfo_en"
              multiline
              rows={4}
              component={IxTextFieldForm}
              label={t('FoodItemForm.nutritionInfo')}
            />}
            {tabValue === 1 && <Field
              name="nutritionInfo_ja"
              multiline
              rows={4}
              component={IxTextFieldForm}
              label={t('FoodItemForm.nutritionInfo')}
            />}
            {tabValue === 2 && <Field
              name="nutritionInfo_ko"
              multiline
              rows={4}
              component={IxTextFieldForm}
              label={t('FoodItemForm.nutritionInfo')}
            />}
            {tabValue === 3 && <Field
              name="nutritionInfo_zh"
              multiline
              rows={4}
              component={IxTextFieldForm}
              label={t('FoodItemForm.nutritionInfo')}
            />}
          </Box>
          <Box>
            {tabValue === 0 && <Field
              name="properties_en"
              multiline
              rows={4}
              component={IxTextFieldForm}
              label={t('FoodItemForm.properties')}
            />}
            {tabValue === 1 && <Field
              name="properties_ja"
              multiline
              rows={4}
              component={IxTextFieldForm}
              label={t('FoodItemForm.properties')}
            />}
            {tabValue === 2 && <Field
              name="properties_ko"
              multiline
              rows={4}
              component={IxTextFieldForm}
              label={t('FoodItemForm.properties')}
            />}
            {tabValue === 3 && <Field
              name="properties_zh"
              multiline
              rows={4}
              component={IxTextFieldForm}
              label={t('FoodItemForm.properties')}
            />}
          </Box>

          <Box width="70%" ml={2}>
            <Field name="isDailyOpeningEnabled" component={IxSwitch} label={t('NxtFoodItemHome.maintain_stock')}></Field>
          </Box>
          <Box p={1}>
            <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }}>
              {t('FoodItemForm.MaintainStockMessage')}
            </Typography>
          </Box>
          <Box width="30%">
            <Field
              name="dailyOpeningCount"
              component={IxTextFieldForm}
              label={t('FoodItemForm.defaultStock')}
            />
          </Box>
        </Collapse>

        <Box display="flex">
          <Box width="90%" pt={2} pl={1}>
            <Typography paragraph variant="paragraph">{t('NxtFoodItemHome.menu_pricing')}</Typography>
          </Box>
          <Box>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expandedPrice,
              })}
              onClick={handleExpandedPriceClick}
              aria-expanded={expandedPrice}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>
        <Collapse in={expandedPrice} timeout="auto">
          <Box display="flex" >
            <Box width="30%">
              <Field
                name="defaultPrice"
                component={IxTextFieldForm}
                label={"Default Price"}
              />
            </Box>
            <Box width="70%" p={1}>
              <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }}>
                {t('NxtFoodItemHome.menu_pricing_msg')}
            </Typography>
            </Box>
          </Box>
        </Collapse>

        <DialogActions>
          <Box textAlign="left" width="100%">
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

FoodItemForm = reduxForm({
  form: 'FoodItemForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  //initialValues: editData,
  validate,
})(FoodItemForm)

export default FoodItemForm