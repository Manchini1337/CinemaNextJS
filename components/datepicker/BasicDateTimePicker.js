import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import addHours from 'date-fns/addHours';

export default function BasicDateTimePicker({
  date,
  setStartDate,
  setEndDate,
  label,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label={label}
        value={date}
        ampm={false}
        onChange={(newValue) => {
          setStartDate(newValue);
          setEndDate(addHours(newValue, 2));
        }}
      />
    </LocalizationProvider>
  );
}
