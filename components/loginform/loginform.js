import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { OutlineButton } from '../button/button';
import classes from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userslice';
import Redirect from '../redirect/redirect';
import api from '../../utils/api/axios.interceptor';

const LoginForm = () => {
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [disclaimer, setDisclaimer] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    formRef.current.classList.add(`${classes.active}`);
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', {
        username: formData.username,
        password: formData.password,
      });

      const userData = response.data;
      if (response.status === 200) {
        dispatch(userActions.setUserData(userData));
        setLoggedIn(true);
      }
    } catch (error) {
      setDisclaimer(error.response.data.message);
      console.log(error.response.data);
      setFormData({
        username: '',
        password: '',
      });
    }
  };

  if (loggedIn) {
    return <Redirect path={'/profile'}>Pomyślnie zalogowano.</Redirect>;
  }

  return (
    <div className={classes.container}>
      <form className={classes.form} ref={formRef} onSubmit={loginHandler}>
        <h2 className={classes.title}>Zaloguj się</h2>
        <div className={classes.form__group}>
          <label htmlFor='username'>Nazwa użytkownika</label>
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
                setDisclaimer('');
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
                setDisclaimer('');
              }}
              value={formData.password}
            />
            <i className='bx bx-lock-alt' />
          </div>
          <span className={classes.help__text}>Minimum 8 znaków.</span>
        </div>
        <div className={classes.btn__group}>
          <OutlineButton className={classes.btn__login} type='submit'>
            Zaloguj się
          </OutlineButton>

          <Link href='/register' passHref>
            <div>
              <OutlineButton className={classes.btn__login}>
                Zarejestruj się
              </OutlineButton>
            </div>
          </Link>
        </div>
        <p className={classes.disclaimer}>{disclaimer}</p>
      </form>
    </div>
  );
};

export default LoginForm;
