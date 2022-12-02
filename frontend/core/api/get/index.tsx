import axios from 'axios';

export const getTestData = async () => {
  const url = 'http://localhost:3001/api/people';
  try {
    return await axios.get(url);
  } catch (error) {
    console.error(error);
  }
  return null;
};
