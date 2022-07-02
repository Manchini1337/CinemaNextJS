import RegisterForm from '../../components/registerform/registerform';
import Head from 'next/head';

const RegisterPage = () => {
  return (
    <>
      <Head>
        <title>Zarejestruj się</title>
        <meta
          name='description'
          content='Create an account to keep your tickets in order history'
        />
      </Head>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
