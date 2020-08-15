import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  form: {
    width: '50%',
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
    '& .MuiFormLabel-root': {
      // margin: theme.spacing(0, 0, 0, 1),
    }
  },
  input: {
    '& .MuiOutlinedInput-input': {
      padding: '10.5px 14px'
    },
    '& .MuiFormHelperText-contained': {
      margin: theme.spacing(0, 0, 0, 0)
    }
  }
}));

const IxDatePickerHtml = ({
  label,
  input,
  touchedOnLoad,
  meta: { touched, invalid, error },
  ...custom
}) => {
  const classes = useStyles();

  return (
    <FormControl
      error={(touchedOnLoad || touched) && error}
      className={classes.form}
    >
      {/* {label && <FormLabel component="legend" ml={1}>{label}</FormLabel>} */}
      <TextField
        className={classes.input}
        variant="outlined"
        id="date"
        label={label}
        //placeholder={label}
        type="date"
        defaultValue="2017-05-24"
        InputLabelProps={{
          shrink: true
        }}
        error={(touchedOnLoad || touched) && invalid}
        helperText={(touchedOnLoad || touched) && error}
        {...input}
        {...custom}
      />
    </FormControl>
  );
};

export default IxDatePickerHtml;
