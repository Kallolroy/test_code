import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import IxFromHelper from './ix-formhelper';

const useStyles = makeStyles((theme) => ({
  select: {
    '& .MuiOutlinedInput-input': {
      // padding: '10.5px 14px',
    },
  },
  form: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      margin: theme.spacing(1, 1, 0, 1),
    },
    '& .MuiFormLabel-root': {
      margin: theme.spacing(0, 0, 0, 1),
    },
    '& .MuiFormHelperText-contained': {
      marginLeft: '10px',
    },
    '& .MuiInputLabel-outlined, .MuiFormLabel-filled': {
      marginTop: '0.8em',
    },
  },
}));

const IxSelectField = ({
  input,
  label,
  isNative = true,
  touchedOnLoad,
  meta: { touched, error },
  children,
  ...custom
}) => {
  const classes = useStyles();
  const inputLabel = React.useRef(null);

  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl
      error={(touchedOnLoad || touched) && error}
      variant="outlined"
      className={classes.form}
    >
      {/* {label && <FormLabel component="legend">{label}</FormLabel>} */}
      <InputLabel ref={inputLabel} htmlFor="ix-select-field">
        {label}
      </InputLabel>
      <Select
        className={classes.select}
        labelWidth={labelWidth}
        native={isNative}
        {...input}
        {...custom}
        displayEmpty
        inputProps={{
          name: input.name,
          id: input.id,
        }}
      >
        {children}
      </Select>
      {IxFromHelper({ touched, touchedOnLoad, error })}
    </FormControl>
  );
};

export default IxSelectField;
