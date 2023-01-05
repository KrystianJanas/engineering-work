import { useRouter } from 'next/router';

import { SpinnerLoading } from '~/components/compounds/Spinner';
import { useAuth } from '~/components/contexts/useContextProvider';

import { SignInPage } from '../../../pages/auth/sign-in';

export const ProtectRoute = ({ children }: any) => {
  const router = useRouter();

  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <SpinnerLoading />;
  }

  if (!isAuthenticated && !router.pathname.includes('/auth/sign')) {
    return <SignInPage />;
  }
  if (isAuthenticated && window.location.pathname.includes('/auth/sign')) {
    window.location.pathname = '/';
    return <SpinnerLoading />;
  }

  return children;
};
