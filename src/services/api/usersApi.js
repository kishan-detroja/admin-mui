import axiosInstance from 'src/services/axios';
import { USERS_ENDPOINTS } from 'src/services/endpoints';

export const usersApi = {
  getUsers: async (params) => {
    const response = await axiosInstance.get(USERS_ENDPOINTS.LIST, { params });
    return response.data;
  },

  getUser: async (id) => {
    const response = await axiosInstance.get(USERS_ENDPOINTS.DETAIL(id));
    return response.data;
  },

  createUser: async (userData) => {
    const response = await axiosInstance.post(USERS_ENDPOINTS.CREATE, userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await axiosInstance.put(USERS_ENDPOINTS.UPDATE(id), userData);
    return response.data;
  },

  deleteUser: async (id) => {
    const response = await axiosInstance.delete(USERS_ENDPOINTS.DELETE(id));
    return response.data;
  },

  bulkDeleteUsers: async (ids) => {
    const response = await axiosInstance.post(USERS_ENDPOINTS.BULK_DELETE, { ids });
    return response.data;
  },

  // Get user statistics
  getUserStats: () => axiosInstance.get('/users/stats'),
};
