import { QueryClient, QueryClientProvider } from 'react-query';

import 'bootstrap/dist/css/bootstrap.min.css';

import styled from '@emotion/styled';
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

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  background: #f6f7f9;
`;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <StyledBackground>
        <Header />
        <Component {...pageProps} />
      </StyledBackground>
    </QueryClientProvider>
  );
};

export default CustomApp;
