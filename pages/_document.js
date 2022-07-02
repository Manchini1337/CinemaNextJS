import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang='pl-PL'>
        <Head>
          <link
            rel='stylesheet'
            href='https://unpkg.com/swiper@7/swiper-bundle.min.css'
          />

          <link
            href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css'
            rel='stylesheet'
          />
          <script src='https://www.paypal.com/sdk/js?client-id=AS4fKQSnD2CdDfNdYTkRdi0kWnvZYUTmlIxGkETf-sFX6pp-ToZGAXXNATkkBJ1CgjOUmmRd7LlZLwbM&currency=PLN&disable-funding=blik,p24,card'></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
