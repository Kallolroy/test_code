import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FormControl, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        // margin: theme.spacing(1)
      },
      '& .MuiFormLabel-root': {
        //margin: theme.spacing(0, 0, 0, 1),
      },
      '& .MuiInputBase-input':{
        padding: '12px 8px !important',
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-marginDense':{
        transform: 'translate(14px, 22px) scale(1)'
      },
      '& .MuiInputLabel-outlined.MuiInputLabel-shrink':{
        transform: 'translate(14px, -6px) scale(.75)'
      },
      width: '100%',
    },
    input: {
      '& .MuiFormHelperText-contained': {
        margin: theme.spacing(0, 0, 0, 0),
      },
    },
    paper:{
      boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
      borderRadius: '4px',
      backgroundColor: '#ffffff',
      color: '#586069',
      fontSize: 13,
    },
    option:{
      minHeight: 'auto',
      alignItems: 'flex-start',
      padding: 8,
      '&[aria-selected="true"]': {
        backgroundColor: 'transparent',
      },
      '&[data-focus="true"]': {
        backgroundColor: theme.palette.action.hover,
      },
    }
  }));

const IxControlledAutoComplete = ({
    id,
    label,
    options,
    displayProperty,
    getOptionSelected,
    input,
    multiple,
    disableClearable,
    meta: { touched, invalid, error }}) => {
    const classes = useStyles();

    const equalityCheck = (option, value) => {
        if(value === '' || value === [] || (Object.keys(value).length && option[displayProperty] === value[displayProperty])){
            return true;
        }
        return false;
    }

    const getLabel = (option) => {
        return option && Object.keys(option).length ? option[displayProperty] : '';
    }

    return (
      <FormControl error={touched && error} className={classes.root} >
        <Autocomplete
            id={id}
            multiple={multiple}
            options={options}
            getOptionLabel={getLabel}
            getOptionSelected={equalityCheck}
            value={input.value}
            onChange={(event, newValue) => {
                input.onChange(newValue);
            }}
            disableClearable={disableClearable}
            classes={{
              paper: classes.paper,
              option: classes.option,
              // popperDisablePortal: classes.popperDisablePortal,
            }}
            renderInput={params => (
            <TextField
                className={classes.input}
                {...params}
                label={label}
                error={touched && invalid}
                helperText={touched && error}
                variant="outlined"
            />
            )}
        />
        </FormControl>
    )
}

export default IxControlledAutoComplete
