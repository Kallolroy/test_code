import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import { NavLink, BrowserRouter as Router } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
    link: {
        'text-decoration': 'none',
        color: 'rgba(0,0,0,.87)'
    }
}))

const IxNavLink = ({ path, name }) => {
    const classes = useStyles();
    return (
        <NavLink className={classes.link} to={path}>
            <Box display="flex">
                <Box mr={2} mt={1}>
                    <ArrowBackIcon style={{ 'font-size': '20px' }} />
                </Box>
                <Box pt={'5px'}>
                    {name}
                </Box>
            </Box>
        </NavLink>
    );
}

export default IxNavLink