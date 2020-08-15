import React from 'react';
import Button from '@material-ui/core/Button';

export const IxButton = ({ type, label }) => {
  return <Button type={type} variant="contained" color="primary">
    {label}
  </Button>
}