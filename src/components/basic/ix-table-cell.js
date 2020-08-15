import React from 'react';
import { TableCell, withStyles } from '@material-ui/core';

/**
 * HOC, apply the table cell style
 * All the table cell content will be passed through this wrapper
 * For specific table cell design, design will be implemented through this component
 * @param {string} tableCellText the text, about to render in the table cell
 * @param {object/cssClass} tableCellStyle the style, about to be implemented on the text
 */
const IxTableCell = ({ children, tableCellStyle }) => {
  const StyledTableCell = withStyles(theme => tableCellStyle)(TableCell);
  return <StyledTableCell>{children}</StyledTableCell>;
};

export default IxTableCell;
