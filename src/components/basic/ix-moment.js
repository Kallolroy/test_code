import React from 'react';
import Moment from 'react-moment';

/**
 * wrapper of the react-moment component
 * use to format and render date
 * @param {string} dateFormat for example "YYYY/MM/DD".
 * @param {string} dateValue the date, that is about to be rendered and formate
 */
const IxMoment = ({ dateFormat, dateValue }) => (
  <Moment format={dateFormat}>{dateValue}</Moment>
);

export default IxMoment;
