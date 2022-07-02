import classes from './UserForm.module.css';
import { useRef, useEffect, useState } from 'react';
import { OutlineButton } from '../button/button';
import api from '../../utils/api/axios.interceptor';
import { userActions } from '../../store/userslice';
import { useDispatch } from 'react-redux';

const UserForm = ({ user }) => {
  const formRef = useRef(null);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    formRef.current.classList.add(`${classes.active}`);
  }, []);

  useEffect(() => {
    setFormData({
      ...formData,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put('/users', {
        id: user.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password,
      });
      if (response) {
        setMessage('Pomyślnie edytowano użytkownika');
      }
      try {
        const response = await api.get('/users/data');
        dispatch(userActions.setUserData(response.data));
      } catch (error) {
        setMessage('Coś poszło nie tak, spróbuj ponownie');
      }
    } catch (err) {
      setMessage('Coś poszło nie tak, spróbuj ponownie.');
    }
  };
  return (
    <div className={classes.container}>
      <form className={classes.form} ref={formRef} onSubmit={handleSubmit}>
        <h2 className={classes.title}>Aktualizuj dane</h2>

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
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
                setMessage('');
              }}
              value={formData.firstName}
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
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
                setMessage('');
              }}
              value={formData.lastName}
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
              onChange={(e) => {
                setFormData({ ...formData, phoneNumber: e.target.value });
                setMessage('');
              }}
              value={formData.phoneNumber}
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
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                setMessage('');
              }}
              value={formData.email}
            />
            <i className='bx bx-envelope' />
          </div>
        </div>

        <div className={classes.form__group}>
          <label htmlFor='password'>Password</label>
          <div className={classes.input__group}>
            <input
              type='password'
              required
              pattern='.{8,}'
              id='password'
              name='password'
              placeholder='Hasło'
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                setMessage('');
              }}
              value={formData.password}
            />
            <i className='bx bx-lock-alt' />
          </div>
          <span className={classes.help__text}>Minimum 8 znaków.</span>
        </div>
        <div className={classes.btn__group}>
          <OutlineButton className={classes.btn__login} type='submit'>
            Aktualizuj
          </OutlineButton>
        </div>
        {message && (
          <p className={classes.success}>Pomyślnie zaaktualizowano dane</p>
        )}
      </form>
    </div>
  );
};

export default UserForm;
