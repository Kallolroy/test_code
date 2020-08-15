import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const IxCopyright = ({ name }) => {
    // const name = "Next Corp Ltd.";
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'© Copyright  '} {new Date().getFullYear()}{' '}
            <Link color="inherit" href="#">
                , {name}
            </Link>
        </Typography>
    );
}

export default IxCopyright