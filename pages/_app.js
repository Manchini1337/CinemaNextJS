import '../styles/globals.css';
import Layout from '../components/layout/layout';
import { Provider } from 'react-redux';
import store from '../store';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Cinema App</title>
          <meta name='description' content='Next JS Cinema Booking App.' />
          <meta
            name='viewport'
            content='initial-scale=1.0, width=device-width'
          />
          <link rel='shortcut icon' href='/favicon-32x32.png' />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
