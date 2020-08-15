import React from 'react';

import IxMoment from './ix-moment';

/**
 * use to render the date with appropriate format in the table cell
 * @param {string} tableCellText this is the date, to be rendered
 * @param {object/cssClass} tableCellStyle the project cell style if it is required to override
 * @param {string} tableCellStyle the rendered format of the date, a list can be found in `src/constants`
 */
const IxDateTableCellContent = ({
  tableCellText,
  tableCellStyle,
  dateFormat
}) => (
  <IxMoment
    style={tableCellStyle}
    dateFormat={dateFormat}
    dateValue={tableCellText}
  />
);

export default IxDateTableCellContent;
