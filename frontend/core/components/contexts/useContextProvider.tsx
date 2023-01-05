import { useState, useContext, createContext, useEffect } from 'react';
import * as React from 'react';

import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

import api, { setAuthorization } from '~/components/contexts/api';

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
          }
        } catch (error) {
          // @ts-ignore
          if (error.response.status === 403) {
            cookies.remove('token');
            cookies.remove('user');
          }
        }
      }
      setLoading(false);
    }

    loadUserFromCookies();
  }, []);

  const logout = () => {
    cookies.remove('token');
    cookies.remove('user');
    setUser('');
    setAuthorization('');
    router.push('/auth/sign-in');
  };

  const login = (id: string) => {
    setUser(id);
    setPersonID(id);
    cookies.set('user', id);
    router.push('/');
  };

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
