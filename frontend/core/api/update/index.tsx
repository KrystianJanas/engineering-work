import toast from 'react-hot-toast';

import api from '~/components/contexts/api';

export const updateQuery = async (pageEndpoint: string, data: any) => {
  try {
    return await api.put(`${pageEndpoint}`, data).catch((e) => {
      toast.error(e.response.data?.message);
    });
  } catch (error) {
    console.error(error);
  }
  return null;
};
