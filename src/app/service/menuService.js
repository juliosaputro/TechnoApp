// src/app/service/menuService.js (atau tambahkan ke file service yang ada)
import { authApiClient } from './instance'; // Gunakan instance DENGAN auth
import apiConstants from '../../constants/api';

/**
 * Mengambil data dari endpoint menu.
 * @returns {Promise<object>} Promise yang resolve dengan data menu dari API.
 * @throws {Error} Melempar error jika pengambilan data gagal.
 */
export const getMenuDataApi = async () => {
  try {
    console.log('Attempting to fetch menu data from:', apiConstants.menu);
    // Gunakan authApiClient karena data menu mungkin memerlukan login
    const response = await authApiClient.post(apiConstants.menu);
    console.log('Menu API Response:', response.data);
    // Asumsikan API mengembalikan data dalam format tertentu, misal { result: [...] }
    return response.data; // Kembalikan seluruh data response
  } catch (error) {
    console.error(
      'Menu API Error:',
      error.response?.data || error.message || error
    );
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch menu data.';
    throw new Error(errorMessage);
  }
};
