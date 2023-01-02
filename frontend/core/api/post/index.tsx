import toast from 'react-hot-toast';

import axios from 'axios';

export const postQuery = async (pageEndpoint: string, data: any) => {
  try {
    return await axios
      .post(`http://localhost:3001/api/${pageEndpoint}`, data)
      .catch((e) => {
        toast.error(e.response.data?.message);
      });
  } catch (error) {
    console.error(error);
  }
  return null;
};

export const postFileQuery = async (endpoint: string, formData: FormData) => {
  try {
    return await axios.post(`http://localhost:3001/api/${endpoint}`, formData, {
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
