import React from 'react';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';

import { yellowBaseColor } from '../../constants/theme-colors';

const StyledLink = withStyles({
  root: {
    color: yellowBaseColor,
    fontSize: 13,
    fontWeight: '600'
  },
  underlineHover: {
    cursor: 'pointer'
  }
})(Link);

/**
 * Render link type content in the table cell
 * @param {string} tableCellText value to be displayed
 * @param {string} hypertextReference link to be redirected
 */

const IxLinkTableCellContent = ({ tableCellText, hypertextReference }) => (
  <StyledLink href={hypertextReference}>{tableCellText}</StyledLink>
);

export default IxLinkTableCellContent;
