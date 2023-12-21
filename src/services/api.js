import axios from 'axios';

const BACKEND_URL = 'https://your-backend-api-url.com';

export const fetchData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};