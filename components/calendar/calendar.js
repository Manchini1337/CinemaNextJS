import addDays from 'date-fns/addDays';
import { useState } from 'react';
import { OutlineButton } from '../button/button';
import classes from './Calendar.module.css';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { capitalizeFirstLetter } from '../../utils/helpers/helpers';

const Calendar = (props) => {
  const [chosenDay, setChosenDay] = useState(
    capitalizeFirstLetter(format(new Date(), 'eeee dd.MM', { locale: pl }))
  );
  const weekdays = [];

  for (let i = 0; i < 7; i++) {
    const today = new Date();
    const day = format(addDays(today, i), 'eeee dd.MM', { locale: pl });
    const formattedDay = capitalizeFirstLetter(day);
    const dateObject = {
      dateString: formattedDay,
      dateValue: addDays(today, i),
    };
    weekdays.push(dateObject);
  }

  return (
    <div className={classes.calendar}>
      <h2>Wybierz dzień</h2>
      <h3>{chosenDay}</h3>
      <div className={classes.calendar__buttons}>
        {weekdays.map((day, i) => (
          <OutlineButton
            key={i}
            className={classes.calendar__button}
            onClick={() => {
              props.setDates(day.dateValue);
              setChosenDay(
                capitalizeFirstLetter(
                  format(day.dateValue, 'eeee dd.MM', { locale: pl })
                )
              );
            }}
          >
            {day.dateString}
          </OutlineButton>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
