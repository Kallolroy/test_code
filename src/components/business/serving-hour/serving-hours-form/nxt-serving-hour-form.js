import React from 'react';
import { Field, reduxForm } from 'redux-form'
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import DialogActions from '@material-ui/core/DialogActions';
import { green } from '@material-ui/core/colors';
import validate from './validate'
import IxTextFieldForm from '../../../basic/ix-text-field-form';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next'
import SaveIcon from '@material-ui/icons/Save';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-root': {
      '& input': {
        fontSize: '16px',
        color: 'rgba(0,0,0,0.87)',
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
  timeRangeWrapper: {
    display: 'flex',
  },
  timeRange: {
    flexGrow: 1
  },
  description: {
    margin: theme.spacing(1),
    fontSize: '12px',
    color: 'rgba(0,0,0,0.54)',
    marginBottom: theme.spacing(4),
  }
}));


let ServingHoursForm = (props) => {
  const { handleSubmit, handleClose, initialValues, pristine, reset, submitting, error, loading } = props;
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <>
      <form onSubmit={handleSubmit} className={classes.root}>
        <Box mb={1}>
          <Field
            name="name"
            component={IxTextFieldForm}
            label={t('NxtServingHourForm.Label_Name')}
          // props={{
          //   InputLabelProps:{
          //     shrink: true,
          //   }
          // }}
          />
        </Box>

        <Box className={classes.timeRangeWrapper}>
          <Box mb={1} className={classes.timeRange} >
            <Field
              name="startTime"
              component={IxTextFieldForm}
              label={t('NxtServingHour.Label_Start_Time')}
              props={{
                type: "time",
                InputLabelProps: {
                  shrink: true,
                },
                // value: initialValues.startTime && initialValues.startTime.split('T')[1].substring(0,5)
              }}
            />
          </Box>
          <Box mb={1} className={classes.timeRange}>
            <Field
              name="endTime"
              component={IxTextFieldForm}
              label={t('NxtServingHour.Label_End_Time')}
              props={{
                type: "time",
                InputLabelProps: {
                  shrink: true,
                },
                // value: initialValues.endTime && initialValues.endTime.split('T')[1].substring(0,5)
              }}
            />
          </Box>
        </Box>

        <Typography variant="body1" className={classes.description}>
          {t('NxtServingHourForm.Description')}
        </Typography>

        <DialogActions>
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

ServingHoursForm = reduxForm({
  form: 'ServingHoursForm', // a unique identifier for this form
  destroyOnUnmount: true,
  forceUnregisterOnUnmount: true,
  validate,
})(ServingHoursForm)

export default ServingHoursForm