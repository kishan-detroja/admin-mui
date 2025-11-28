// Auth endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/passport/login',
  REGISTER: '/auth/register',
  ME: '/auth/passport/is-logged-in',
  REFRESH: '/auth/refresh',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  VERIFY_EMAIL: '/auth/verify-email',
};

// User endpoints
export const USERS_ENDPOINTS = {
  LIST: '/users',
  DETAIL: (id) => `/users/${id}`,
  CREATE: '/users',
  UPDATE: (id) => `/users/${id}`,
  DELETE: (id) => `/users/${id}`,
  BULK_DELETE: '/users/bulk-delete',
  STATUS: (id) => `/users/${id}/status`,
};
