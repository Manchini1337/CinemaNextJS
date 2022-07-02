import MovieBackground from '../../components/moviebackground/moviebackground';
import OrderForm from '../../components/orderform/orderform';
import { useState } from 'react';
import Head from 'next/head';

const OrderPage = () => {
  const [background, setBackground] = useState('');
  return (
    <>
      <Head>
        <title>Złóż zamówienie</title>
        <meta
          name='description'
          content='Create your order to buy tickets to the event'
        />
      </Head>
      <MovieBackground background={background} />
      <OrderForm setBackground={setBackground} />
    </>
  );
};

export default OrderPage;
