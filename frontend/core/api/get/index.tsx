import axios from 'axios';

export const getPage = async (pageEndpoint: string) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/api/${pageEndpoint}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
  return null;
};
