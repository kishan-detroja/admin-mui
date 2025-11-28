import axiosInstance from 'src/services/axios';
import { AUTH_ENDPOINTS } from 'src/services/endpoints';

export const authApi = {
  login: async (credentials) => {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGIN, credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.REGISTER, userData);
    return response.data;
  },

  getMe: async () => {
    const response = await axiosInstance.get(AUTH_ENDPOINTS.ME);
    return response.data;
  },

  logout: async () => {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.LOGOUT);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email });
    return response.data;
  },

  resetPassword: async (data) => {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.RESET_PASSWORD, data);
    return response.data;
  },

  verifyEmail: async (token) => {
    const response = await axiosInstance.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { token });
    return response.data;
  },
};
