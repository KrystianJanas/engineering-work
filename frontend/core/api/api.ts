import Axios from 'axios';
import Cookies from 'universal-cookie';

const api = Axios.create({
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
  baseURL: 'http://localhost:3001/api',
});

export const setAuthorization = (accessToken: string): void => {
  if (accessToken && accessToken.length > 0) {
    api.defaults.headers.common = {
      ...api.defaults.headers.common,
      Authorization: `Bearer ${accessToken}`,
    };
  } else {
    api.defaults.headers.common = {
      ...api.defaults.headers.common,
      Authorization: ``,
    };
  }
};

const cookies = new Cookies();

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (err.response?.status === 401) {
      if (cookies.get('_token')) {
        await api.get('logout');
        setAuthorization('');
        window.location.reload();
      }
    }
    return Promise.reject(err);
  }
);

export default api;
