import Axios from 'axios';
import Cookies from 'universal-cookie';

const cookie = new Cookies();

const api = Axios.create({
  headers: { 'Content-type': 'application/json', Accept: 'application/json' },
  baseURL: 'http://localhost:3001/api',
});

export const setAuthorization = (accessToken: string): void => {
  if (accessToken && accessToken.length > 0) {
    cookie.set('token', accessToken);

    api.defaults.headers.common = {
      ...api.defaults.headers.common,
      Authorization: `Bearer ${accessToken}`,
    };
  }
  // else if (cookie.get('token')) {
  //   cookie.remove('token');
  // }
  // if (cookie.get('user')) {
  //   cookie.remove('user');
  // }
};

export default api;
