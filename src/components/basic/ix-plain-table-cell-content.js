import React from 'react';

import { useStyles } from './styles';

/**
 * use to render plain text in table cell with the provided style
 * @param {string} tableCellText the text, about to render in the table cell
 * @param {object} tableCellStyle the style, about to be implemented on the text
 * @param {string} tableCellContentClassName class style will be implement inside the table cell content
 */
const IxPlainTableCellContent = ({
  tableCellText = '',
  tableCellContentStyle = {},
  tableCellContentClassName = ''
}) => {
  const classes = useStyles();
  return (
    <div
      style={tableCellContentStyle}
      className={classes[tableCellContentClassName]}
    >
      {tableCellText}
    </div>
  );
};

export default IxPlainTableCellContent;
