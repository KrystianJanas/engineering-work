import { QueryClient, QueryClientProvider } from 'react-query';

import 'bootstrap/dist/css/bootstrap.min.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { GlobalStyles } from '~/styles';

import { Header } from '../modules/header/components/header';
import { useActiveNavLink } from '../modules/header/hooks/useActiveNavLink';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

// const StyledBackground = styled.div`
//   width: 100%;
//   height: 100%;
//   background: var(--grey-20);
// `;

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const { pathname } = useRouter();
  const { pageTitle } = useActiveNavLink(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <GlobalStyles />

      {pathname !== '/sign-in' && <Header />}

      <Component {...pageProps} />
    </QueryClientProvider>
  );
};

export default CustomApp;
