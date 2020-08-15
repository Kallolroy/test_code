import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const IxSwitch = ({
    label,
    value,
    input,
    ...custom
}) => {
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