import MainHeader from './mainHeader';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import api from '../../utils/api/axios.interceptor';
import { userActions } from '../../store/userslice';

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get('/users/data')
      .then((response) => {
        dispatch(userActions.setUserData(response.data));
      })
      .catch((error) => console.log(error));
  }, [dispatch]);
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};

export default Layout;
