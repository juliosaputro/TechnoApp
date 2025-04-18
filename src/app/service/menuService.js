import {authApiClient} from './instance';
import apiConstants from '../../constants/api';

/**
 * @returns {Promise<object>}
 * @throws {Error}
 */
export const getMenuDataApi = async () => {
  try {
    const response = await authApiClient.post(apiConstants.menu);
    console.log('Menu API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error(
      'Menu API Error:',
      error.response?.data || error.message || error,
    );
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Failed to fetch menu data.';
    throw new Error(errorMessage);
  }
};
