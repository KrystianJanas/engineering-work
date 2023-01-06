import api from '~/api/api';

export const getData = async (
  pageEndpoint: string,
  restEndpoint?: string,
  page?: number,
  perPage?: number,
  params?: any
) => {
  try {
    if (restEndpoint && restEndpoint.length > 0) {
      const { data } = await api.get(`${pageEndpoint}/${restEndpoint}`, {
        params: {
          page,
          perPage,
          ...params,
        },
      });
      return data;
    }
    const { data } = await api.get(`${pageEndpoint}`, {
      params: {
        page,
        perPage,
        ...params,
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
    const response = await api.get(`${endpoint}`, {
      responseType: 'blob',
    });
    return response;
  } catch (error) {
    console.error(error);
  }
  return null;
};
