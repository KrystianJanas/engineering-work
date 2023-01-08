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

  const removeAllCookies = async () => {
    await cookies.remove('user');
    await cookies.remove('token');
  };

  const setCookies = async (token: string, userID: string) => {
    const tokenGet = await cookies.get('token');
    const userGet = await cookies.get('user');

    if (token && token.length > 0) {
      if (!tokenGet) {
        cookies.set('token', token);
      } else if (cookies.get('token') === token) {
        // mam token, wiec nie tworze na nowo
      } else {
        await cookies.remove('token');
        cookies.set('token', token);
      }
    }
    if (userID && userID.length > 0) {
      if (!userGet) {
        cookies.set('user', userID);
      } else if (cookies.get('user') === userID) {
        // mam userid, wiec nie tworze na nowo
      } else {
        await cookies.remove('user');
        cookies.set('user', userID);
      }
    }
  };

  const logout = async () => {
    setAuthorization('');
    setUser('');
    await removeAllCookies();
    await router.push('/auth/sign-in');
  };

  const login = async (id: string) => {
    setUser(id);
    setPersonID(id);
    await setCookies('', id);
    await router.push('/');
  };

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = cookies.get('token');

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
      } else if (cookies.get('user')) {
        await removeAllCookies();
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
