import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';

const columns =

    [
        { title: 'id', field: 'id', hidden: true },
        {
            title: 'Name', field: 'name',
            render: rowData =>
                <Link color="secondary" href="#">{rowData.name}</Link>
        },
        { title: 'Preparation', field: 'prepareDuration' },
        { title: 'Price', field: 'price' },
        {
            title: 'Status', field: 'isActive',
            render: rowData =>
                <Box borderRadius="25px" textAlign="center" style={{ 'background-color': rowData.isActive ? '#ef6c00' : '#7F8C8D' }} color="#fff" >{rowData.isActive ? 'Active' : 'inActive'}</Box>
        },
        
        
    ]

export default columns