import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import { useStyles as basicComponentStyles } from './styles';

const useStyles = makeStyles(theme => ({
    select: {
        "font-size": "14px",
        "& .MuiOutlinedInput-notchedOutline": {
            border: 0
        }
    },
    notchedOutline: {
        borderColor: '#ffffff'
    }
}));

const IxSelect = ({ label, value, children, handleChange, customClassName }) => {
    const classes = useStyles();
    const basicComponentClasses = basicComponentStyles();
    return (
        <FormControl variant="outlined" >
            <InputLabel>{label}</InputLabel>
            <Select className={clsx(basicComponentClasses[customClassName], classes.select)}
                value={value}
                onChange={handleChange}
                label={label}
            >
                {children}
            </Select>
        </FormControl>
    )

}

export default IxSelect