import Axios from 'axios';

const api = Axios.create({
  headers: { 'Content-type': 'application/json', Accept: 'application/json' },
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

export default api;
