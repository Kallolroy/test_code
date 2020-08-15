import React, { useState, useEffect } from 'react';
import * as moment from 'moment';

import IxTextField from '../basic/ix-text-field';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  datePickerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  textFieldContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  fromDateTextField: {
    paddingRight: '1px'
  },
  toDateTextField: {
    paddingLeft: '1px'
  },
  errorMessageStyle: {
    color: 'red'
  }
});

const IxDateRangePicker = ({
  defaultFromDate,
  defaultToDate,
  onChangeDateRange,
  title = 'Date Picker',
  customErrorMessage = 'Invalid date range.'
}) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState('');
  const [inValidDateFlag, setInvalidDateFlag] = useState(false);
  const [dateRangeValue, setDateRangeValue] = useState({
    startDate: null,
    endDate: null
  });

  const onChangeStartDate = event => {
    const startDate = event.target.value;
    setDateRangeValue({
      ...dateRangeValue,
      startDate
    });
  };

  const onChangeEndDate = event => {
    const endDate = event.target.value;
    setDateRangeValue({
      ...dateRangeValue,
      endDate
    });
  };

  const validateDateRange = () => {
    const { startDate, endDate } = dateRangeValue;
    setInvalidDateFlag(
      startDate && endDate && !moment(endDate).isAfter(startDate)
    );
  };
  useEffect(() => {
    onChangeDateRange(dateRangeValue);
    validateDateRange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRangeValue]);

  useEffect(() => {
    inValidDateFlag ? setErrorMessage(customErrorMessage) : setErrorMessage('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inValidDateFlag]);

  return (
    <div className={classes.datePickerContainer}>
      <div>{title}</div>
      <div className={classes.textFieldContainer}>
        <div className={classes.fromDateTextField}>
          <IxTextField
            defaultValue={defaultFromDate}
            onChangeTextField={onChangeStartDate}
            isError={inValidDateFlag}
            type="date"
          />
        </div>
        <div className={classes.toDateTextField}>
          <IxTextField
            defaultValue={defaultToDate}
            onChangeTextField={onChangeEndDate}
            isError={inValidDateFlag}
            type="date"
          />
        </div>
      </div>
      <div className={classes.errorMessageStyle}>{errorMessage}</div>
    </div>
  );
};

export default IxDateRangePicker;
