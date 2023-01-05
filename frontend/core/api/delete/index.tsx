import toast from 'react-hot-toast';

import api from '~/components/contexts/api';

export const deleteQuery = async (pageEndpoint: string, id: string) => {
  try {
    return await api.delete(`${pageEndpoint}/${id}`).catch((e) => {
      toast.error(e.response.data?.message);
    });
  } catch (error) {
    console.error(error);
  }
  return null;
};
