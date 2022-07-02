import classes from './HallPreview.module.css';
import MovieBackground from '../moviebackground/moviebackground';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { capitalizeFirstLetter } from '../../utils/helpers/helpers';
import { useEffect, useState } from 'react';
import { OutlineButton } from '../button/button';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { orderActions } from '../../store/orderslice';

const HallPreview = (props) => {
  const event = props.event;
  const router = useRouter();
  const dispatch = useDispatch();

  const [seats, setSeats] = useState([]);
  const [chosenSeats, setChosenSeats] = useState([]);
  const [disclaimer, setDisclaimer] = useState(false);

  useEffect(() => {
    setSeats(event.seats);
  }, []);

  const handleSeatClick = (seat) => {
    if (seat.isAvailable) {
      setChosenSeats([...chosenSeats, seat]);
      setDisclaimer(false);
    } else {
      setChosenSeats(
        chosenSeats.filter((chosenSeat) => chosenSeat.id !== seat.id)
      );
    }
    setSeats(
      seats.map((updatedSeat) =>
        updatedSeat.id === seat.id
          ? { ...seat, isAvailable: !seat.isAvailable }
          : updatedSeat
      )
    );
  };

  const handleConfirmClick = () => {
    if (chosenSeats.length === 0) {
      setDisclaimer(true);
      return;
    }
    dispatch(
      orderActions.setOrder({
        selectedSeats: chosenSeats,
        eventId: event.id,
      })
    );
    router.push('/order');
  };

  return (
    <>
      <MovieBackground background={event.movie.background} />
      <div className={classes.container}>
        <div className={classes.poster}>
          <img src={event.movie.poster} alt='poster' />
        </div>
        <div className={classes.screening}>
          <h2>{event.movie.name}</h2>
          <h3>
            {capitalizeFirstLetter(
              format(new Date(event.startDate), 'eeee dd.MM HH:mm', {
                locale: pl,
              })
            )}
          </h3>
          <div className={classes.hall}>
            <div className={classes.hall__screen}></div>
            <div className={classes.hall__seats}>
              {seats.map((seat, index) => (
                <div
                  key={seat.id}
                  className={
                    event.seats[index].isAvailable
                      ? seat.isAvailable
                        ? `${classes.seat} ${classes.seat__available}`
                        : `${classes.seat} ${classes.seat__selected}`
                      : `${classes.seat} ${classes.seat__unavailable}`
                  }
                  onClick={() =>
                    event.seats[index].isAvailable
                      ? handleSeatClick(seat)
                      : null
                  }
                >
                  {seat.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.summary}>
          <h3 className={classes.summary__title}>Wybrane miejsca:</h3>
          {chosenSeats.map((chosenSeat) => (
            <div key={chosenSeat.id} className={classes.chosenSeat}>
              {chosenSeat.name}
            </div>
          ))}
          <div className={classes.summary__buttons}>
            {disclaimer && (
              <p className={classes.summary__warning}>
                Nie wybrano żadnych miejsc!
              </p>
            )}
            <OutlineButton
              className={classes.summary__button}
              onClick={handleConfirmClick}
            >
              Zarezerwuj
            </OutlineButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default HallPreview;
