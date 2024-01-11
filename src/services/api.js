import axios from 'axios';

const BACKEND_ENDPOINT = 'https://gamecraftfunc.azurewebsites.net';
const FUNCTION_KEY = "3LQBt84tTmZSvy-0SeVb6PbHH3a8-KudnjrvBebmysaSAzFutO8Gkg==";

const fetchData = async (route, body, requestType, headers = {}) => {
  headers['Content-Type'] = 'application/json';
  headers['X-Functions-Key'] = FUNCTION_KEY;

  console.log('-----------------------------------------------------------------');
  console.log('Axios Request:', requestType, BACKEND_ENDPOINT + route);
  console.log('Request Headers:', headers);
  console.log('Request Body:', body);

  try {
    console.log('Axios Request', BACKEND_ENDPOINT, FUNCTION_KEY);
    const response = await axios({
      method: requestType,
      url: BACKEND_ENDPOINT + route,
      headers,
      data: JSON.stringify(body),
    });

    // Fail returns error.
    if (!response.data.result) {
      throw new Error(response.data.msg);
    }

    return response.data;
  } catch (error) {
    console.error('Error in Axios Request:', error.message);
    throw error;
  }
};

export const handleUserRegister = async (data) => {
  const response = await fetchData('/user/register', data, 'POST')

  return response
}

export const handleGameSubscribe = async (data) => {
  const response = await fetchData('/subscribe', data, 'POST')

  return response
}

export const handleUserLogin = async (data) => {
  const response = await fetchData('/user/login', data, 'POST')

  return response
}

export const handleGameSubmit = async (data) => {
  const response = await fetchData('/game/submit', data, 'POST')

  return response
}

export const handleGameGetall = async (data) => {
  const response = await fetchData('/game/getall', data, 'GET')

  return response
}

export const handleGameUpdate = async (data) => {
  const response = await fetchData('/game/update', data, 'PUT')

  return response
}
