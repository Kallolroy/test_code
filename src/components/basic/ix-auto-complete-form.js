import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
    '& .MuiFormLabel-root': {
      //margin: theme.spacing(0, 0, 0, 1),
    },
    width: '50%'
  },
  input: {
    '& .MuiFormHelperText-contained': {
      margin: theme.spacing(0, 0, 0, 0)
    }
  }
}));

const IxAutoCompleteForm = ({
  options,
  label,
  input,
  meta: { touched, invalid, error },
  onChangeAutoComplete = null,
  displayProperty = 'name',
  ...custom
}) => {
  // const defaultProps = {
  //     options: options,
  //     getOptionLabel: option => option.name,
  // };
  const classes = useStyles();
  return (
    <FormControl error={touched && error} className={classes.form}>
      {/* {label && <FormLabel component="legend" ml={1}>{label}</FormLabel>} */}
      <Autocomplete
        multiple={false}
        id="ix-autocomplete"
        className={classes.input}
        options={options}
        // {...defaultProps}
        getOptionLabel={option => option[displayProperty]}
        style={{ width: 300 }}
        onChange={(event, newValue) => {
          onChangeAutoComplete && onChangeAutoComplete(event, newValue);
        }}
        renderInput={params => (
          <TextField
            {...params}
            label={label}
            //placeholder={label}
            size="small"
            error={touched && invalid}
            helperText={touched && error}
            {...input}
            {...custom}
            variant="outlined"
          />
        )}
      />
    </FormControl>
  );
};

export default IxAutoCompleteForm;
