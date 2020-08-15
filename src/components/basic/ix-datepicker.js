import 'date-fns';
import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';

export default function IxDatePicker({ defaultDate, onChangeDate = null }) {
  // The first commit of Material-UI
  const defaultSelectedDate = defaultDate || new Date('1980-08-18T21:11:54');
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);

  const handleDateChange = date => {
    setSelectedDate(date);
    onChangeDate && onChangeDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="outlined"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label="Date picker inline"
        value={selectedDate}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
