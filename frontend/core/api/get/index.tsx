import axios from 'axios';

export const getData = async (
  pageEndpoint: string,
  restEndpoint?: string,
  page?: number,
  perPage?: number
) => {
  try {
    if (restEndpoint) {
      const { data } = await axios.get(
        `http://localhost:3001/api/${pageEndpoint}/${restEndpoint}`,
        {
          params: {
            page,
            perPage,
          },
        }
      );
      return data;
    }
    const { data } = await axios.get(
      `http://localhost:3001/api/${pageEndpoint}`
    );
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
