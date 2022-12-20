import toast from 'react-hot-toast';

import axios from 'axios';

export const updateQuery = async (pageEndpoint: string, data: any) => {
  try {
    return await axios
      .put(`http://localhost:3001/api/${pageEndpoint}`, data)
      .catch((e) => {
        toast.error(e.response.data?.message);
      });
  } catch (error) {
    console.error(error);
  }
  return null;
};
