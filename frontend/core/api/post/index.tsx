import axios from 'axios';

export const postQuery = async (pageEndpoint: string, data: any) => {
  try {
    return await axios.post(`http://localhost:3001/api/${pageEndpoint}`, data);
  } catch (error) {
    console.error(error);
  }
  return null;
};
