import classes from './MainHeader.module.css';
import React, { useEffect, useRef } from 'react';
import logo from '../../assets/logo.png';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/userslice';
import { useRouter } from 'next/router';
import api from '../../utils/api/axios.interceptor';

const MainHeader = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const userDisplay = user.username
    ? {
        display: user.username,
        path: '/profile',
      }
    : {
        display: 'Zaloguj się',
        path: '/login',
      };

  const headerNav = [
    { display: 'Strona główna', path: '/' },
    { display: 'Harmonogram', path: '/schedule' },
    userDisplay,
  ];

  const headerRef = useRef(null);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add(`${classes.header__shrink}`);
      } else {
        headerRef.current.classList.remove(`${classes.header__shrink}`);
      }
    };
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
    };
  }, []);

  const logoutHandler = async () => {
    try {
      const response = await api.post('/users/logout');
      if (response) {
        dispatch(userActions.resetUserData());
        router.replace('/');
      }
    } catch (err) {
      console.log(error);
    }
  };

  return (
    <header ref={headerRef} className={classes.header}>
      <div className={`${classes.header__wrap} container`}>
        <div className={classes.logo}>
          <div className='mr-1'>
            <Image src={logo} alt='Logo' width={50} height={50} />
          </div>
          <Link href='/'>Cinema</Link>
        </div>
        <ul className={classes.header__nav}>
          {headerNav.map((e, i) => (
            <li key={i}>
              <Link href={e.path}>{e.display}</Link>
            </li>
          ))}
          {user.username && user.username !== '' && (
            <i
              onClick={logoutHandler}
              className={`bx bx-log-out ${classes.header__icon}`}
            ></i>
          )}
        </ul>
      </div>
    </header>
  );
};

export default MainHeader;
