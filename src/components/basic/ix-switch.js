import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles(theme => ({
    form: {
        width: "50%",
        margin: theme.spacing(1, 0, 1, 1)
    },
}));

const IxSwitch = ({
    label,
    value,
    input,
    meta: { touched, invalid, error },
    ...custom
}) => {
    const classes = useStyles();
    return (
        <FormControl>
            <FormControlLabel
                control={
                    <Switch checked={(input.value === "" || input.value) ? true : false} {...input} {...custom} size="small" />
                }
                label={label}
            />
        </FormControl>

    )
}

export default IxSwitch;