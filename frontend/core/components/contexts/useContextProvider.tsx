import { useState, useContext, createContext, useEffect } from 'react';
import * as React from 'react';

import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

import api, { setAuthorization } from '~/api/api';

const cookies = new Cookies();

const AuthContext = createContext({
  isAuthenticated: false,
  loading: true,
  user: '',
  logout: () => {},
  login: (id: string) => {},
  personID: '',
});

export const AuthProvider = ({ children }: any) => {
  const router = useRouter();

  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  const [personID, setPersonID] = useState(user);

  const setCookies = async (token: string, userID: string) => {
    const tokenGet = await cookies.get('_token');
    const userGet = await cookies.get('_user');

    if (token && token.length > 0) {
      if (!tokenGet) {
        cookies.set('_token', token);
      } else if (cookies.get('_token') !== token) {
        // tu powinno wykryc useEffecta i wylogowac uzytkownika.
      } else {
        await cookies.remove('_token');
        cookies.set('_token', token);
      }
    }
    if (userID && userID.length > 0) {
      if (!userGet) {
        cookies.set('_user', userID);
      } else if (cookies.get('_user') !== userID) {
        await cookies.remove('_user');
        cookies.set('_user', userID);
      } else {
        await cookies.remove('_user');
        cookies.set('_user', userID);
      }
    }
  };

  const logout = async () => {
    const data = await api.get('logout');
    if (data && data.status === 204) {
      setAuthorization('');
      setUser('');
    }
  };

  const login = async (id: string) => {
    setUser(id);
    setPersonID(id);
    await router.push('/');
  };

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = cookies.get('_token');

      if (token) {
        setAuthorization(token);

        try {
          const { data } = await api.get('users/me');
          if (data) {
            setUser(data._id);
            setPersonID(data._id);

            await setCookies(token, data._id);
          } else {
            logout();
          }
        } catch (error) {
          // @ts-ignore
          if (error.response.status === 403) {
            logout();
            return;
          }
        }
      } else if (cookies.get('_user')) {
        await logout();
      }
      setLoading(false);
    }

    loadUserFromCookies();
  }, [router.pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user.length,
        user,
        loading,
        login,
        logout,
        personID,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
