import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
    '& .MuiFormLabel-root': {
      //margin: theme.spacing(0, 0, 0, 1),
    },
    width: '100%'
  },
  input: {
    '& .MuiFormHelperText-contained': {
      margin: theme.spacing(0, 0, 0, 0)
    },
    backgroundColor: '#ffffff'
  }
}));

const IxTextFieldForm = ({
  label,
  input,
  touchedOnLoad,
  meta: { touched, invalid, error },
  onChangeTextFieldValue,
  ...custom
}) => {
  const classes = useStyles();

  return (
    <FormControl
      error={(touchedOnLoad || touched) && error}
      className={classes.form}
    >
      <TextField
        className={classes.input}
        // size="small"
        variant="outlined"
        label={label}
        error={(touchedOnLoad || touched) && invalid}
        helperText={(touchedOnLoad || touched) && error}
        onChange={onChangeTextFieldValue}
        {...input}
        {...custom}
      />
    </FormControl>
  );
};
export default IxTextFieldForm;
