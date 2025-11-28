import apiService from 'src/services/apiService';
import { USERS_ENDPOINTS } from 'src/services/endpoints';

export const usersApi = {
  // Get all users with optional filters
  getUsers: async (params) => apiService.get(USERS_ENDPOINTS.LIST, params),

  // Get single user by ID
  getUser: async (id) => apiService.get(USERS_ENDPOINTS.DETAIL(id)),

  // Create new user
  createUser: async (userData) => apiService.post(USERS_ENDPOINTS.CREATE, userData),

  // Update existing user
  updateUser: async (id, userData) => apiService.put(USERS_ENDPOINTS.UPDATE(id), userData),

  // Delete user
  deleteUser: async (id) => apiService.delete(USERS_ENDPOINTS.DELETE(id)),

  // Bulk delete users
  bulkDeleteUsers: async (ids) => apiService.post(USERS_ENDPOINTS.BULK_DELETE, { ids }),

  // Get user statistics
  getUserStats: async (params) => apiService.get('/users/stats', params),
};
