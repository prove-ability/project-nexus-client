import { CacheProvider } from '@emotion/core';
import { cache } from 'emotion';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'styles/globalStyles';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <CacheProvider value={cache}>
        <Component {...pageProps} />
      </CacheProvider>
    </Provider>
  );
}
// import { CacheProvider } from '@emotion/core';
// import { cache } from 'emotion';
// import NextApp from 'next/app';
// import globalStyles from 'src/styles/globalStyles';

// export default class MyApp extends NextApp {
//   componentDidCatch(error, errorInfo): void {
//     console.log('CUSTOM ERROR HANDLING', error);
//     // This is needed to render errors correctly in development / production
//     super.componentDidCatch(error, errorInfo);
//   }

//   render(): JSX.Element {
//     const { Component, pageProps } = this.props;
//     return (
//       <CacheProvider value={cache}>
//         {globalStyles}
//         <Component {...pageProps} />
//       </CacheProvider>
//     );
//   }
// }
