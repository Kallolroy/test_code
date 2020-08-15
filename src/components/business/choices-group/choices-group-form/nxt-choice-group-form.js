import React, { useEffect, useRef } from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import { green } from '@material-ui/core/colors';
import validate from './validate'
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import IxRadioGroup from '../../../basic/ix-radiogroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Radio from '@material-ui/core/Radio'
import IxSwitch from '../../../basic/ix-switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useTranslation } from 'react-i18next'
import { Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import GenerateChoiceItems from './generate-choice-item';

const useStyles = makeStyles((theme) => ({
  formWrapper:{
    '& .MuiInputBase-root':{
      '& input':{
        fontSize: '16px',
        color:'rgba(0,0,0,0.87)',
        fontWeight: 400
      }
    }
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  formControlLabel:{
    fontSize: '14px',
    fontWeight: '400',
  },
  formControlLabelFirstItem: {
    fontSize: '14px',
    fontWeight: '400',
    marginRight: theme.spacing(3)
  },
  formControlLabelSmall:{
    fontSize: '12px',
    fontWeight: 400
  },
  activeSwitch: {
    fontSize: '16px',
    fontWeight: '400',
    color: 'rgba(0,0,0,.87)',
    marginLeft: '16px'
  }
}));

let ChoiceGroupForm = (props) => {
  const { handleSubmit, handleClose, pristine, reset, submitting, error, loading, ChoiceGroupRadioValues, initialValues} = props;
  const classes = useStyles();
  const { t } = useTranslation();
  
  const [isRequired, setIsRequired] = React.useState(ChoiceGroupRadioValues.optional);
  const [isMultivalued, setisMultivalued] = React.useState(ChoiceGroupRadioValues.single);

  const [isActive, setIsActive] = React.useState(true);
  // const [menuType, setMenuType] = React.useState('Regular');
  const [tabValue, setTabValue] = React.useState(0);
  const radioInput = useRef(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    props.change("langTab", newValue);
  };

  const handleChoiceSelectionChange = (event) => {
    const value = event.target.value;
    setIsRequired(value);
    props.change("isRequired", value);
  };

  const handleChoiceTypeChange = (event) => {
    const value = event.target.value;
    setisMultivalued(value);
    props.change("isMultivalued", value)
  }

  useEffect(()=> {
    const {isRequired, isMultivalued, isActive, } = initialValues;
    isRequired ? setIsRequired(ChoiceGroupRadioValues.required) : setIsRequired(ChoiceGroupRadioValues.optional);
    isMultivalued ? setisMultivalued(ChoiceGroupRadioValues.multiple) : setisMultivalued(ChoiceGroupRadioValues.single);
    setIsActive(isActive);
  },[]);

  const renderTabs = ({ input, label, meta: { touched, invalid, value, error }, children, ...rest }) => {
    return (
      <Box mb={1}>
        <Tabs {...input} {...rest}
          value={tabValue}
          ref={radioInput}
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
      <form onSubmit={handleSubmit} className={classes.formWrapper}>
        {/* {rendering language tab} */}
        <Box mb={1} >
          <Field
            name="langTab"
            component={renderTabs}
          />
        </Box>

        <Box mb={1} mt={2}>
          {tabValue === 0 && <Field
            name="name_en"
            component={IxTextFieldForm}
            label={t('NxtChoicesGroupFormLabel.name')}
          />}
          {tabValue === 1 && <Field
            name="name_ja"
            component={IxTextFieldForm}
            label={t('NxtChoicesGroupFormLabel.name')}
          />}
          {tabValue === 2 && <Field
            name="name_ko"
            component={IxTextFieldForm}
            label={t('NxtChoicesGroupFormLabel.name')}
          />}
          {tabValue === 3 && <Field
            name="name_zh"
            component={IxTextFieldForm}
            label={t('NxtChoicesGroupFormLabel.name')}
          />}
        </Box>

        {/* {isRequired} */}
        <Box mt={2}>
          <Field
            name="isRequired"
            component={IxRadioGroup}
            label={<Typography className={classes.formControlLabelSmall}> {t('NxtChoicesGroupFormLabel.selection')} </Typography>}
            onChange={handleChoiceSelectionChange}
          >
            <FormControlLabel 
              classes={{label: classes.formControlLabelFirstItem}}
              value={ChoiceGroupRadioValues.optional}
              control={<Radio checked={isRequired === ChoiceGroupRadioValues.optional} />}
              label={t('common.optional')} />
            <FormControlLabel 
              classes={{label: classes.formControlLabel}}
              value={ChoiceGroupRadioValues.required}
              control={<Radio checked={isRequired === ChoiceGroupRadioValues.required} />}
              label={t('common.required')} />
          </Field>
        </Box>

        {/* {isMultivalued} */}
        <Box mt={2}>
          <Field
            name="isMultivalued"
            component={IxRadioGroup}
            label={<Typography className={classes.formControlLabelSmall}> {t('NxtChoicesGroupFormLabel.type')} </Typography>}
            onChange={handleChoiceTypeChange}
          >
            <FormControlLabel 
              classes={{label: classes.formControlLabelFirstItem}}
              value={ChoiceGroupRadioValues.single}
              control={<Radio checked={isMultivalued === ChoiceGroupRadioValues.single} />}
              label={t('NxtChoicesGroupFormLabel.type_single')} />
            <FormControlLabel
              classes={{label: classes.formControlLabel}}
              value={ChoiceGroupRadioValues.multiple}
              control={<Radio checked={isMultivalued === ChoiceGroupRadioValues.multiple} />}
              label={t('NxtChoicesGroupFormLabel.type_multiple')} />
          </Field>
        </Box>


        <Box mt={2} p={1}>
          <FieldArray name="choicesItems" component={GenerateChoiceItems} tabValue={tabValue} />
        </Box>

        <DialogActions>
          <Box width="70%">
            <Field name="isActive" component={IxSwitch} checked={isActive} 
              label={<Typography className={classes.activeSwitch}> {t('common.active')} </Typography>} onChange={()=> {setIsActive(!isActive)}}></Field>
          </Box>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            {t('common.cancel_button')}
          </Button>
          <Button type="submit" variant="contained" disabled={loading} color="secondary" startIcon={<SaveIcon />}>
            {t('common.save')}
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </DialogActions>
      </form >
    </>
  )
}

ChoiceGroupForm = reduxForm({
  form: 'ChoiceGroupForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate,
})(ChoiceGroupForm)

export default ChoiceGroupForm