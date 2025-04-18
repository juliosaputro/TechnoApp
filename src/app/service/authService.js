import {apiClient} from './instance';
import apiConstants from '../../constants/api';

/**
 * @param {object} credentials
 * @param {string} credentials.username
 * @param {string} credentials.password
 * @returns {Promise<object>}
 * @throws {Error}
 */

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

export const loginApi = async credentials => {
  const {username, password} = credentials;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    console.error(
      'Client ID or Client Secret is missing. Check your .env file and configuration.',
    );
    throw new Error('Client configuration is missing.');
  }

  try {
    const response = await apiClient.post(apiConstants.login, {
      grant_type: 'password',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      username: username,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.error(
      'Login API Error:',
      error.response?.data || error.message || error,
    );
    throw (
      error.response?.data ||
      new Error('Login failed due to network or server error.')
    );
  }
};
