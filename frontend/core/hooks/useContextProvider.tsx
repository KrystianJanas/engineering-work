import { useState, useMemo, useContext } from 'react';
import * as React from 'react';

import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

const authTokensArr = ['userId', 'personId', 'accessToken'] as const;

export type AuthTokens =
  | { [key in typeof authTokensArr[number]]: string }
  | null;
const cookies = new Cookies();

const AuthContext = React.createContext({
  isLogged: false,
  logOut: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveTokens: (authTokens: AuthTokens) => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}) => {
  const router = useRouter();

  const [tokens, setTokens] = useState<AuthTokens>(null);
  const isLogged = !!tokens;
  console.log('auth: ', tokens);

  const saveTokens = (authTokens: AuthTokens) => {
    const { userId, personId, accessToken } = authTokens!;
    cookies.set('auth', { userId, accessToken, personId }, { path: '/' });
    setTokens({ userId, accessToken, personId });
  };

  const deleteTokens = () => {
    cookies.remove('auth', { path: '/' });
    setTokens(null);
  };

  const logOutHandler = () => {
    deleteTokens();
    router
      .push('/auth/sign-in')
      .then((result: boolean) => router.push('/auth/sign-in'));
  };

  const logInHandler = () => {
    // here token save
  };

  const contextValue = useMemo(
    () => ({
      isLogged,
      logIn: logInHandler,
      logOut: logOutHandler,
      saveTokens,
      setTokens,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tokens]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
