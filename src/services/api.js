import axios from 'axios';

// Constants for backend endpoint and function key
const BACKEND_ENDPOINT = 'https://gamecraftfunc.azurewebsites.net';
const FUNCTION_KEY = "3LQBt84tTmZSvy-0SeVb6PbHH3a8-KudnjrvBebmysaSAzFutO8Gkg==";

// Function to make API requests using Axios
const fetchData = async (route, body, requestType, headers = {}) => {
  // Set default headers for JSON and function key
  headers['Content-Type'] = 'application/json';
  headers['X-Functions-Key'] = FUNCTION_KEY;

  // Logging request details for debugging
  console.log('-----------------------------------------------------------------');
  console.log('Axios Request:', requestType, BACKEND_ENDPOINT + route);
  console.log('Request Headers:', headers);
  console.log('Request Body:', body);

  try {
    // Make the Axios request with specified method, URL, headers, and data
    const response = await axios({
      method: requestType,
      url: BACKEND_ENDPOINT + route,
      headers,
      data: JSON.stringify(body),
    });

    // Check if the API response indicates success, otherwise throw an error
    if (!response.data.result) {
      throw new Error(response.data.msg);
    }

    return response.data; // Return the response data on success
  } catch (error) {
    console.error('Error in Axios Request:', error.message);
    throw error; // Propagate the error if there's an issue with the request
  }
};

// Function to handle user registration
export const handleUserRegister = async (data) => {
  const response = await fetchData('/user/register', data, 'POST');
  return response;
};

// Function to handle game subscription
export const handleGameSubscribe = async (data) => {
  const response = await fetchData('/subscribe', data, 'POST');
  return response;
};

// Function to handle user login
export const handleUserLogin = async (data) => {
  const response = await fetchData('/user/login', data, 'POST');
  return response;
};

// Function to handle game submission
export const handleGameSubmit = async (data) => {
  const response = await fetchData('/game/submit', data, 'POST');
  return response;
};

// Function to handle fetching all games
export const handleGameGetall = async (data) => {
  const response = await fetchData('/game/getall', data, 'GET');
  return response;
};

// Function to handle updating game details
export const handleGameUpdate = async (data) => {
  const response = await fetchData('/game/update', data, 'PUT')

  return response
}