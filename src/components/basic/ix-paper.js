import React from 'react';
import { Paper } from '@material-ui/core';

const IxPaper = ({
  variant = 'elevation',
  square = false,
  elevation = 0,
  children
}) => (
  <Paper variant={variant} square={square} elevation={elevation}>
    {children}
  </Paper>
);

export default IxPaper;
