import '../styles/globals.css';
import type { AppProps } from 'next/app';

function ExampleApp({ Component, pageProps }: AppProps) {
  // Prop spreading is required by NextJS here and reasonable to allow
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default ExampleApp;
