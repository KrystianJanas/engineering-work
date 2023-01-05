import axios from 'axios';

import api from '~/components/contexts/api';

export const getData = async (
  pageEndpoint: string,
  restEndpoint?: string,
  page?: number,
  perPage?: number
) => {
  try {
    if (restEndpoint && restEndpoint.length > 0) {
      const { data } = await api.get(`${pageEndpoint}/${restEndpoint}`, {
        params: {
          page,
          perPage,
        },
      });
      return data;
    }
    const { data } = await api.get(`${pageEndpoint}`, {
      params: {
        page,
        perPage,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const getFileDownload = async (endpoint: string) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/${endpoint}`, {
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};
