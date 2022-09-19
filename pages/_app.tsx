import { QueryClient, QueryClientProvider } from 'react-query';

import type { AppProps } from 'next/app';

import { GlobalStyles } from '~/styles';

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
      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default CustomApp;
