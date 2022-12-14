import { QueryClient, QueryClientProvider } from 'react-query';

import 'bootstrap/dist/css/bootstrap.min.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import AuthContext, { AuthContextProvider } from '~/hooks/useContextProvider';
import { GlobalStyles } from '~/styles';

import { Header } from '../modules/header/components/header';
import { useActiveNavLink } from '../modules/header/hooks/useActiveNavLink';

// eslint-disable-next-line import/order
import { Toaster } from 'react-hot-toast';
// eslint-disable-next-line import/order
import { useContext } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const { pageTitle } = useActiveNavLink(pathname);

  const { isLogged } = useContext(AuthContext);

  // console.log('isLogged:', isLogged); // todo: console.log

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Toaster />
      <GlobalStyles />

      <AuthContextProvider>
        {!pathname.toString().includes('auth') && <Header />}

        <Component {...pageProps} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default CustomApp;
