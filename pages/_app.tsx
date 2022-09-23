import { QueryClient, QueryClientProvider } from 'react-query';

import 'bootstrap/dist/css/bootstrap.min.css';

import type { AppProps } from 'next/app';

import { GlobalStyles } from '~/styles';

import { Header } from '../modules/header/components/header';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Header />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default CustomApp;
