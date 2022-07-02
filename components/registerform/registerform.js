import React, { useState, useEffect, useRef } from 'react';
import { OutlineButton } from '../button/button';
import classes from './RegisterForm.module.css';
import Redirect from '../redirect/redirect';
import api from '../../utils/api/axios.interceptor';

const RegisterForm = () => {
  const formRef = useRef(null);

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState(emptyForm);

  const emptyForm = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    username: '',
    password: '',
  };

  useEffect(() => {
    formRef.current.classList.add(`${classes.active}`);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });
      if (response.status === 201) {
        setFormData(emptyForm);
        setIsRedirecting(true);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  if (isRedirecting) {
    return (
      <Redirect path={'/login'}>Pomyślnie zarejestrowano użytkownika.</Redirect>
    );
  }

  return (
    <div className={classes.container}>
      <form className={classes.form} ref={formRef} onSubmit={handleSubmit}>
        <h2 className={classes.title}>Zarejestruj się</h2>
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
                setErrorMessage('');
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
                setErrorMessage('');
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
                setErrorMessage('');
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
                setErrorMessage('');
              }}
              value={formData.email}
            />
            <i className='bx bx-envelope' />
          </div>
        </div>

        <div className={classes.form__group}>
          <label htmlFor='username'>Nazwa użytkownika:</label>
          <div className={classes.input__group}>
            <input
              type='text'
              required
              pattern='.{3,}'
              id='username'
              name='username'
              placeholder='Nazwa użytkownika'
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
                setErrorMessage('');
              }}
              value={formData.username}
            />
            <i className='bx bx-user' />
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
                setErrorMessage('');
              }}
              value={formData.password}
            />
            <i className='bx bx-lock-alt' />
          </div>
          <span className={classes.help__text}>Minimum 8 znaków.</span>
        </div>
        <div className={classes.btn__group}>
          <OutlineButton className={classes.btn__login} type='submit'>
            Stwórz konto
          </OutlineButton>
        </div>
        {errorMessage && <p className={classes.error}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default RegisterForm;
