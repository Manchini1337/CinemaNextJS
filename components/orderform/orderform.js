import classes from './OrderForm.module.css';
import { useRef, useEffect, useState } from 'react';
import { OutlineButton } from '../button/button';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';
import { capitalizeFirstLetter } from '../../utils/helpers/helpers';
import Paypal from '../paypal/paypal';
import { useDispatch } from 'react-redux';
import { orderActions } from '../../store/orderslice';
import Redirect from '../redirect/redirect';
import api from '../../utils/api/axios.interceptor';

const OrderForm = (props) => {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  const [renderPaypalButton, setRenderPaypalButton] = useState(false);
  const [normalButton, setNormalButton] = useState(true);
  const [orderSent, setOrderSent] = useState(false);
  const [price, setPrice] = useState(order.selectedSeats.length * 20);
  const [event, setEvent] = useState({
    id: '1',
    startDate: new Date(),
    endDate: new Date(),
    movie: {
      id: '1',
      name: '',
      poster: '',
      background: '',
    },
  });
  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    userId: null,
    eventId: null,
    seatId: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/events/${order.eventId}`);
        setEvent(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  if (!order.eventId) {
    return <Redirect path='/'>Brak danych o zamówieniu.</Redirect>;
  }

  useEffect(() => {
    formRef.current.classList.add(`${classes.active}`);
  }, []);

  useEffect(() => {
    setDetails({
      ...details,
      eventId: order.eventId,
      seatId: order.selectedSeats,
    });
    if (user.username && user.username !== '') {
      setDetails({
        ...details,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        email: user.email,
        userId: user.id,
      });
    }
  }, [details.eventId]);

  useEffect(() => {
    props.setBackground(event.movie.background);
  }, [event]);

  const sendOrder = async () => {
    try {
      const response = await api.post('/orders', {
        firstName: details.firstName,
        lastName: details.lastName,
        phoneNumber: details.phoneNumber,
        email: details.email,
        userId: user.id ? user.id : null,
        eventId: order.eventId,
        seatId: order.selectedSeats,
      });
      if (response.status === 201) {
        setOrderSent(true);
        dispatch(orderActions.resetOrder());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderPaypal = () => {
    setNormalButton(false);
    setRenderPaypalButton(true);
  };

  if (orderSent) {
    return <Redirect path={'/'}>Pomyślnie złożono zamówienie.</Redirect>;
  }

  return (
    <div className={classes.container}>
      <div className={classes.poster}>
        <img src={event.movie.poster} alt='poster' />
      </div>
      <div className={classes.summary}>
        <h1>Podsumowanie</h1>
        <h2>{event.movie.name}</h2>
        <h3>{format(new Date(event.startDate), 'yyyy.dd.MM ')}</h3>
        <h3>
          {capitalizeFirstLetter(
            format(new Date(event.startDate), 'eeee HH:mm', {
              locale: pl,
            })
          )}
        </h3>
        <div className={classes.summary__tickets}>
          <h2>Moje bilety:</h2>
          {order.selectedSeats.map((seat) => (
            <p key={seat.id}>{seat.name}</p>
          ))}
        </div>
        <h2>Suma:</h2>
        <p>{price.toString()} zł</p>
      </div>
      <div>
        <form className={classes.form} ref={formRef}>
          <div className={classes.form__group}>
            <label htmlFor='firstname'>Imię:</label>
            <div className={classes.input__group}>
              <input
                type='text'
                required
                pattern='.{3,}'
                id='firstname'
                name='firstname'
                placeholder='Imię'
                onChange={(e) =>
                  setDetails({ ...details, firstName: e.target.value })
                }
                value={details.firstName}
              />
              <i className='bx bx-user' />
            </div>
          </div>
          <div className={classes.form__group}>
            <label htmlFor='lastname'>Nazwisko:</label>
            <div className={classes.input__group}>
              <input
                type='text'
                required
                pattern='.{3,}'
                id='lastname'
                name='lastname'
                placeholder='Nazwisko'
                onChange={(e) =>
                  setDetails({ ...details, lastName: e.target.value })
                }
                value={details.lastName}
              />
              <i className='bx bx-user' />
            </div>
          </div>
          <div className={classes.form__group}>
            <label htmlFor='phonenumber'>Numer telefonu:</label>
            <div className={classes.input__group}>
              <input
                type='text'
                required
                pattern='[0-9]{9}'
                id='phonenumber'
                name='phonenumber'
                placeholder='+48'
                onChange={(e) =>
                  setDetails({ ...details, phoneNumber: e.target.value })
                }
                value={details.phoneNumber}
              />
              <i className='bx bx-phone' />
            </div>
          </div>
          <div className={classes.form__group}>
            <label htmlFor='email'>Email:</label>
            <div className={classes.input__group}>
              <input
                type='email'
                required
                id='email'
                name='email'
                placeholder='Email'
                onChange={(e) =>
                  setDetails({ ...details, email: e.target.value })
                }
                value={details.email}
              />
              <i className='bx bx-envelope' />
            </div>
          </div>
          <OutlineButton className={classes.form__button} onClick={sendOrder}>
            Zarezerwuj
          </OutlineButton>
          <p style={{ textAlign: 'center' }}>Albo:</p>
        </form>
      </div>
      <div className={classes.paypal}>
        <Paypal
          price={price}
          user={user}
          order={order}
          orderDetails={details}
          renderPaypalButton={renderPaypalButton}
          setOrderSent={setOrderSent}
        />
        {normalButton && (
          <OutlineButton
            onClick={renderPaypal}
            className={classes.form__button}
          >
            Zapłać z paypal
          </OutlineButton>
        )}
      </div>
    </div>
  );
};

export default OrderForm;
