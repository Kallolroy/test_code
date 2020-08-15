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
import IxRadioGroup from '../../../basic/ix-radiogroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import IxSwitch from '../../../basic/ix-switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IxFileUpload from '../../../basic/ix-upload-file';
import FormHelperText from '@material-ui/core/FormHelperText'
import Avatar from '@material-ui/core/Avatar';
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
}));


let MenuForm = (props) => {
  const { handleSubmit,
    handleClose, pristine, reset, submitting, error, loading,
    optSlotsData, initialValues,
  } = props
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  // const [langTypeValue, setLangTypeValue] = React.useState('en');
  const [pricingOption, setPricingOption] = React.useState('priceOnMenu');
  const [timeLimit, setTimeLimit] = React.useState('noTimeLimit');
  const [menuType, setMenuType] = React.useState('REGULAR');
  const [tabValue, setTabValue] = React.useState(0);
  const [logo, setLogo] = React.useState(null);
  const radioinput = useRef(null);
  const user = JSON.parse(localStorage.getItem('user'));

  const displayImage = async () => {
    if (initialValues.photo) {
      // const imageData = await getImageData(user.company.id, initialValues.photo);
      const imgSrc = `${config.api.base}/common/companies/${user.company.id}/images/${initialValues.photo}`
      setLogo(imgSrc)
    }
  }

  useEffect(() => {
    displayImage()
    initialValues.menuType && setMenuType(initialValues.menuType)
    initialValues.pricingOption && setPricingOption(initialValues.pricingOption)
    initialValues.timeLimit && setTimeLimit(initialValues.timeLimit)
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    props.change("langType", newValue);
  };

  const handlePricingOptionChange = (event) => {
    setPricingOption(event.target.value);
  };

  const handleTimeLimitChange = (event) => {
    setTimeLimit(event.target.value);
  };

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

  const handleMenuTypeChange = (event) => {
    setMenuType(event.target.value)
    props.change("timeBoundDuration", "")
    props.change("lastTimeToOrder", "")
    props.change("reminderTime", "")
    props.change("packagePrice", "")
    props.change("packageDiscountPercentage", "")

    switch (event.target.value) {
      case 'ALL_YOU_CAN_EAT':
        setPricingOption('priceOfAllMenu');
        setTimeLimit('timeLimit');
        props.change("pricingOption", "priceOfAllMenu")
        props.change("timeLimit", "timeLimit")
        break;
      case 'ALL_YOU_CAN_DRINK':
        setPricingOption('priceOfAllMenu');
        setTimeLimit('timeLimit');
        props.change("pricingOption", "priceOfAllMenu")
        props.change("timeLimit", "timeLimit")
        break;
      case 'HAPPY_HOUR':
        setPricingOption('discountPrice');
        setTimeLimit('timeLimit');
        props.change("pricingOption", "discountPrice")
        props.change("timeLimit", "timeLimit")
        break;
      default:
        setPricingOption('priceOnMenu');
        setTimeLimit('noTimeLimit');
        props.change("pricingOption", "priceOnMenu")
        props.change("timeLimit", "noTimeLimit")
        break;
    }

  }

  const timeFormater = (time) => {
    let timeHour = time.split('T')[1] ? time.split('T')[1].substring(0, 5) : time
    let [hours, minutes] = timeHour.split(":");

    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  const generateTimeSlots = ({ fields, meta: { error, submitFailed } }) => {
    const addSlot = (event) => {
      event.preventDefault();
      fields.push({ "optSlotId": optSlotsData[0].id.toString() })
    }

    const deleteSlot = (event, index) => {
      event.preventDefault();
      fields.remove(index)
    }

    const handleOptSlotChange = (event, index) => {

      let optSlot = optSlotsData.find((s) => s.id.toString() === event.target.value)
      document.getElementsByName(`optName_${index}`)[0].innerText = `Everyday: ${timeFormater(optSlot.startTime)} - ${timeFormater(optSlot.endTime)}`;
    }

    return (
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{t('MenuForm.menuHour')}</TableCell>
              <TableCell align="right" colSpan={2}>{t('MenuForm.timeSlot')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {fields && fields.map((timeSlot, index) => (
              <TableRow key={timeSlot.id}>
                <TableCell align="left">
                  <Field
                    name={`${timeSlot}.optSlotId`}
                    component={IxSelectField}
                    onChange={(e) => handleOptSlotChange(e, index)}
                  >
                    {optSlotsData.map((slot, index) => (
                      <option value={slot.id}>{slot.name}</option>
                    ))}
                  </Field>
                </TableCell>
                <TableCell align="right">
                  <span name={`optName_${index}`}>
                    {`Everyday: ${timeFormater(optSlotsData.find((s) => s.id.toString() === fields.get(index).optSlotId.toString()).startTime)} - ${timeFormater(optSlotsData.find((s) => s.id.toString() === fields.get(index).optSlotId.toString()).endTime)}`}
                  </span>
                </TableCell>
                <TableCell align="right" width="10px">
                  <Link href="#" onClick={(event) => deleteSlot(event, index)} color="secondary">
                    X
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell align="left">
                <Link href="#" onClick={addSlot} color="secondary">
                  {t('MenuForm.AddTimeSlot')}
                </Link>
              </TableCell>
              <TableCell align="right" color="secondary" colSpan={2}>
                <Link href="#">
                  {t('MenuForm.CreateTimeSlot')}
                </Link>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const renderTabs = ({ input, label, meta: { touched, invalid, value, error }, children, ...rest }) => {
    return (
      <Box mb={1}>
        <Tabs {...input} {...rest}
          value={tabValue}
          ref={radioinput}
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
        <Box mb={1}>
          {tabValue === 0 && <Field
            name="name_en"
            component={IxTextFieldForm}
            label={t('MenuForm.name')}
          />}
          {tabValue === 1 && <Field
            name="name_ja"
            // style={{ display: tabValue === 1 ? 'block' : 'none' }}
            component={IxTextFieldForm}
            label={t('MenuForm.name')}
          />}
          {tabValue === 2 && <Field
            name="name_ko"
            component={IxTextFieldForm}
            label={t('MenuForm.name')}
          />}
          {tabValue === 3 && <Field
            name="name_zh"
            component={IxTextFieldForm}
            label={t('MenuForm.name')}
          />}
        </Box>
        <Box width="30%">
          <Field
            name="keyName"
            component={IxTextFieldForm}
            label={t('MenuForm.KeyName')}
          />
        </Box>
        {/* {branches && <Box>
          <Field
            name="branchId"
            component={IxSelectField}
            label={t('common.branch')}
          >
            {branches.map((branch, index) => {
              return <option value={branch.id}>{branch.name}</option>
            })}
          </Field>
        </Box>} */}
        <Box display="flex" mt={2} >
          <Box width="30%">
            <Field
              name="menuType"
              component={IxSelectField}
              label={t('MenuForm.type')}
              onChange={handleMenuTypeChange}
            >
              <option value={'REGULAR'}>Regular</option>
              <option value={'ALL_YOU_CAN_EAT'}>All You can eat</option>
              <option value={'ALL_YOU_CAN_DRINK'}>All You Can Drink</option>
              <option value={'HAPPY_HOUR'}>Happy Hour</option>
              <option value={'CUSTOM'}>Custom</option>
            </Field>
          </Box>
          <Box width="70%" p={1}>
            <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }} >
              {t('MenuForm.typeMessage')}
            </Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Field
            name="pricingOption"
            component={IxRadioGroup}
            label={t('MenuForm.price_option')}
            onChange={handlePricingOptionChange}
          >
            <FormControlLabel value="priceOnMenu"
              disabled={menuType === 'ALL_YOU_CAN_EAT' || menuType === 'ALL_YOU_CAN_DRINK' || menuType === 'HAPPY_HOUR'}
              control={<Radio checked={pricingOption === 'priceOnMenu'} />}
              label={t('MenuForm.priceOnMenu')} />
            <FormControlLabel value="priceOfAllMenu"
              disabled={menuType === 'REGULAR' || menuType === 'HAPPY_HOUR'}
              control={<Radio checked={pricingOption === 'priceOfAllMenu'} />}
              label={t('MenuForm.priceOfAllMenu')} />
            <FormControlLabel value="discountPrice"
              disabled={(menuType === 'ALL_YOU_CAN_EAT' || menuType === 'ALL_YOU_CAN_DRINK' || menuType === 'REGULAR')}
              control={<Radio checked={pricingOption === 'discountPrice'} />}
              label={t('MenuForm.discountPrice')} />
          </Field>
        </Box>
        <Box display="flex" >
          <Box width="30%">
            <Field
              name={menuType === 'HAPPY_HOUR' ? "packageDiscountPercentage" : "packagePrice"}
              disabled={menuType === 'REGULAR'}
              component={IxTextFieldForm}
              label={menuType === 'HAPPY_HOUR' || pricingOption === 'discountPrice' ? "Discount %" : t('MenuForm.package_price')}
            />
          </Box>
          <Box width="70%" p={1}>
            <Typography variant="caption" display="block" gutterBottom style={{ 'font-size': '10px' }}>
              {t('MenuForm.PriceMessage')}
            </Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <Field
            name="timeLimit"
            component={IxRadioGroup}
            label={t('MenuForm.timeLimit')}
            onChange={handleTimeLimitChange}
          >
            <FormControlLabel
              value="noTimeLimit"
              disabled={menuType === 'ALL_YOU_CAN_EAT' || menuType === 'ALL_YOU_CAN_DRINK' || menuType === 'HAPPY_HOUR'}
              control={<Radio checked={timeLimit === 'noTimeLimit'} />}
              label={t('MenuForm.noTimeLimit')} />
            <FormControlLabel
              value="timeLimit"
              disabled={menuType === 'REGULAR'}
              control={<Radio checked={timeLimit === 'timeLimit'} />}
              label={t('MenuForm.timeBound')} />
          </Field>
        </Box>
        <Box display="flex" mt={1}>
          <Box width="33%">
            <Field
              name="timeBoundDuration"
              disabled={timeLimit === 'noTimeLimit' || menuType === 'HAPPY_HOUR'}
              component={IxTextFieldForm}
              label={t('MenuForm.timeBoundDuration')}
            />
          </Box>
          <Box width="33%">
            <Field
              name="lastTimeToOrder"
              disabled={timeLimit === 'noTimeLimit' || menuType === 'HAPPY_HOUR'}
              component={IxTextFieldForm}
              label={t('MenuForm.lastTimeToOrder')}
            />
          </Box>
          <Box width="33%">
            <Field
              name="reminderTime"
              disabled={timeLimit === 'noTimeLimit'}
              component={IxTextFieldForm}
              label={t('MenuForm.reminderTime')}
            />
          </Box>

        </Box>
        <Box m={1} display="flex">
          <Box>
            <FormLabel component="legend" ml={1}>{t('FoodItemForm.image')}</FormLabel>
            <Box width="50%" mt={1}>
              <Avatar variant="rounded" className={clsx(classes.rounded, classes.large)}>
                <Field name="logodisplay" component="img" src={logo} className={clsx(classes.rounded, classes.large)} />
              </Avatar>
            </Box>
            {/* <FormHelperText>{error}</FormHelperText> */}
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

            <DialogActions style={{ "justify-content": "flex-start" }}>
              <Field name="menuPhoto" type="file" component={IxFileUpload} id="menu_logo" label={t('common.add_image')} onChange={handleCapture}></Field>
              <Button variant="contained" onClick={clearLogo}>{t('common.remove')}</Button>
            </DialogActions>
          </Box>
        </Box>
        <Box mt={2} p={1}>
          <FieldArray name="optSlots" component={generateTimeSlots} />
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
    </>
  )
}

MenuForm = reduxForm({
  form: 'MenuForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  //initialValues: editData,
  validate,
})(MenuForm)

export default MenuForm