import {authApiClient} from './instance';
import apiConstants from '../../constants/api';

/**
 * @returns {Promise<object>}
 * @throws {Error}
 */
export const getHomeDataApi = async () => {
  try {
    const response = await authApiClient.get(apiConstants.home);
    console.log('Home API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Home API Error:',
      error.response?.data || error.message || error,
    );
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to fetch home data.';
    throw new Error(errorMessage);
  }
};
