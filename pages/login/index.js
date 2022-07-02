import LoginForm from '../../components/loginform/loginform';
import Head from 'next/head';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Zaloguj się</title>
        <meta
          name='description'
          content='Log In to access your user profile data'
        />
      </Head>
      <LoginForm />
    </>
  );
};

export default LoginPage;
