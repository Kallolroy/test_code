import React from 'react';
import { TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  input: {
    '& .MuiOutlinedInput-input': {
      padding: '10.5px 14px'
    },
    '& .MuiFormHelperText-contained': {
      margin: theme.spacing(0, 0, 0, 0)
    }
  }
}));

/**
 *
 * @param {string} defaultValue format YYYY-MM-DD
 */
const IxTextField = ({
  variant = 'outlined',
  id,
  label,
  placeholder,
  type = 'text',
  defaultValue,
  inputLabelProps = {
    shrink: true
  },
  helperText,
  onChangeTextField,
  isError,
  title
}) => {
  const classes = useStyles();

  return (
    <div>
      <div>{title}</div>
      <TextField
        className={classes.input}
        variant={variant}
        id={id}
        placeholder={placeholder}
        label={label}
        type={type}
        defaultValue={defaultValue}
        InputLabelProps={inputLabelProps}
        helperText={helperText}
        onChange={onChangeTextField}
        error={isError}
      />
    </div>
  );
};

export default IxTextField;
