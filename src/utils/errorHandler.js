/**
 * Handle API error and return user-friendly message
 * @param {Error} error - Error object
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    const { status, data } = error.response;
    
    if (data?.message) {
      return data.message;
    }
    
    switch (status) {
      case 400:
        return 'Invalid request. Please check your input.';
      case 401:
        return 'You are not authorized. Please login again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This resource already exists.';
      case 422:
        return 'Validation failed. Please check your input.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 500:
        return 'Server error. Please try again later.';
      case 503:
        return 'Service unavailable. Please try again later.';
      default:
        return `An error occurred (${status}). Please try again.`;
    }
  }
  
  if (error.request) {
    // Request made but no response
    return 'Network error. Please check your connection.';
  }
  
  // Something else happened
  return error.message || 'An unexpected error occurred.';
};

/**
 * Log error to console in development
 * @param {Error} error - Error object
 * @param {string} context - Context where error occurred
 */
export const logError = (error, context = '') => {
  if (import.meta.env.DEV) {
    console.error(`[Error${context ? ` - ${context}` : ''}]:`, error);
  }
};

/**
 * Create error object with additional context
 * @param {string} message - Error message
 * @param {Object} context - Additional context
 * @returns {Error} Error object with context
 */
export const createError = (message, context = {}) => {
  const error = new Error(message);
  error.context = context;
  return error;
};

/**
 * Check if error is network error
 * @param {Error} error - Error object
 * @returns {boolean} True if network error
 */
export const isNetworkError = (error) => !error.response && error.request;

/**
 * Check if error is authentication error
 * @param {Error} error - Error object
 * @returns {boolean} True if auth error
 */
export const isAuthError = (error) => error.response?.status === 401;

/**
 * Extract validation errors from API response
 * @param {Error} error - Error object
 * @returns {Object} Validation errors object
 */
export const extractValidationErrors = (error) => {
  const errors = {};
  
  if (error.response?.data?.errors) {
    const apiErrors = error.response.data.errors;
    
    if (Array.isArray(apiErrors)) {
      apiErrors.forEach((err) => {
        if (err.field) {
          errors[err.field] = err.message;
        }
      });
    } else if (typeof apiErrors === 'object') {
      Object.keys(apiErrors).forEach((key) => {
        errors[key] = Array.isArray(apiErrors[key]) 
          ? apiErrors[key][0] 
          : apiErrors[key];
      });
    }
  }
  
  return errors;
};
