import { CacheProvider } from '@emotion/core';
import { store } from '@stores';
import globalStyles from '@styles/global';
import { cache } from 'emotion';
import NextApp from 'next/app';
import { ErrorInfo } from 'react';
import { Provider } from 'react-redux';

export default class MyApp extends NextApp {
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('CUSTOM ERROR HANDLING', error);
    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <CacheProvider value={cache}>
          {globalStyles}
          <Component {...pageProps} />
        </CacheProvider>
      </Provider>
    );
  }
}
