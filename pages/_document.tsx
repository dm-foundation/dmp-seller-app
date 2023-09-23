import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body style={{
          margin: '0px',
          width: '100%'
        }}>
          <Main />
          <NextScript />
        </body>
      </Html >
    );
  }
}