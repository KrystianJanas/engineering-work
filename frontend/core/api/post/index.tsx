import toast from 'react-hot-toast';

import api from '~/api/api';

export const postQuery = async (pageEndpoint: string, data: any) => {
  try {
    return await api.post(`${pageEndpoint}`, data).catch((e) => {
      toast.error(e.response.data?.message);
    });
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const postFileQuery = async (endpoint: string, formData: FormData) => {
  try {
    return await api.post(`${endpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    // @ts-ignore
    toast.error(error.response.data.message);
  }
  return null;
};
