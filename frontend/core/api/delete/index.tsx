import toast from 'react-hot-toast';

import axios from 'axios';

export const deleteQuery = async (pageEndpoint: string, id: string) => {
  try {
    return await axios
      .delete(`http://localhost:3001/api/${pageEndpoint}/${id}`)
      .catch((e) => {
        toast.error(e.response.data?.message);
      });
  } catch (error) {
    console.error(error);
  }
  return null;
};
