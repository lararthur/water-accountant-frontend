import React from 'react';
import '../styles/global.scss';
import '../styles/reset.scss';
import Head from 'next/head';
import { UsersProvider } from '../contexts/UsersContext';

interface MyAppProps {
  Component: () => any;
  pageProps: {};
}

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: MyAppProps) {
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <UsersProvider>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Questrial&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </UsersProvider>
  );
}
