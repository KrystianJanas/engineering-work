import { QueryClient, QueryClientProvider } from 'react-query';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@mui/icons-material';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

// eslint-disable-next-line import/namespace
import { ProtectRoute } from '~/components/contexts/protectRoute';
import { AuthProvider } from '~/components/contexts/useContextProvider';
import { GlobalStyles } from '~/styles';

import { Header } from '../modules/header/components/header';
import { useActiveNavLink } from '../modules/header/hooks/useActiveNavLink';

// eslint-disable-next-line import/order
import { Toaster } from 'react-hot-toast';

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

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ minWidth: '1200px', minHeight: '100vh' }}>
        <Head>
          <title>{pageTitle}</title>
        </Head>
        <Toaster />
        <GlobalStyles />
        <AuthProvider>
          <ProtectRoute>
            {!pathname.toString().includes('auth') && <Header />}

            <Component {...pageProps} />
          </ProtectRoute>
        </AuthProvider>
      </div>
    </QueryClientProvider>
  );
};

export default CustomApp;
