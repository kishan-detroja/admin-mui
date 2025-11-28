import apiService from 'src/services/apiService';
import { AUTH_ENDPOINTS } from 'src/services/endpoints';

export const authApi = {
  // User login
  login: async (credentials) => apiService.post(AUTH_ENDPOINTS.LOGIN, credentials),

  // User registration
  register: async (userData) => apiService.post(AUTH_ENDPOINTS.REGISTER, userData),

  // Get current user info
  getMe: async () => apiService.get(AUTH_ENDPOINTS.ME),

  // User logout
  logout: async () => apiService.post(AUTH_ENDPOINTS.LOGOUT),

  // Request password reset
  forgotPassword: async (email) => apiService.post(AUTH_ENDPOINTS.FORGOT_PASSWORD, { email }),

  // Reset password with token
  resetPassword: async (data) => apiService.post(AUTH_ENDPOINTS.RESET_PASSWORD, data),

  // Verify email with token
  verifyEmail: async (token) => apiService.post(AUTH_ENDPOINTS.VERIFY_EMAIL, { token }),
};
