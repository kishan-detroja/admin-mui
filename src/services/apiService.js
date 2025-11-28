import { toQueryParams } from 'src/utils';

import axiosInstance from './axios';

/**
 * Centralized API Service
 * Common HTTP methods with built-in query parameter handling
 */
const apiService = {
  /**
   * GET request
   * @param {string} url - API endpoint
   * @param {Object} params - Query parameters object
   * @param {Object} config - Additional axios config
   * @returns {Promise} Response data
   */
  get: async (url, params = {}, config = {}) => {
    // Convert params object to query string
    const queryString = toQueryParams(params);
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const response = await axiosInstance.get(fullUrl, config);
    return response.data;
  },

  /**
   * POST request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional axios config
   * @returns {Promise} Response data
   */
  post: async (url, data = {}, config = {}) => {
    const response = await axiosInstance.post(url, data, config);
    return response.data;
  },

  /**
   * PUT request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional axios config
   * @returns {Promise} Response data
   */
  put: async (url, data = {}, config = {}) => {
    const response = await axiosInstance.put(url, data, config);
    return response.data;
  },

  /**
   * PATCH request
   * @param {string} url - API endpoint
   * @param {Object} data - Request body
   * @param {Object} config - Additional axios config
   * @returns {Promise} Response data
   */
  patch: async (url, data = {}, config = {}) => {
    const response = await axiosInstance.patch(url, data, config);
    return response.data;
  },

  /**
   * DELETE request
   * @param {string} url - API endpoint
   * @param {Object} params - Query parameters object
   * @param {Object} config - Additional axios config
   * @returns {Promise} Response data
   */
  delete: async (url, params = {}, config = {}) => {
    // Convert params object to query string
    const queryString = toQueryParams(params);
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const response = await axiosInstance.delete(fullUrl, config);
    return response.data;
  },

  /**
   * Upload file(s) using FormData
   * @param {string} url - API endpoint
   * @param {FormData|Object} data - FormData or object to convert to FormData
   * @param {Object} config - Additional axios config
   * @returns {Promise} Response data
   */
  upload: async (url, data, config = {}) => {
    let formData = data;

    // Convert object to FormData if needed
    if (!(data instanceof FormData)) {
      formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => formData.append(key, item));
        } else {
          formData.append(key, value);
        }
      });
    }

    const response = await axiosInstance.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers,
      },
    });
    return response.data;
  },

  /**
   * Download file
   * @param {string} url - API endpoint
   * @param {Object} params - Query parameters object
   * @param {string} filename - Optional filename for download
   * @returns {Promise} Blob data
   */
  download: async (url, params = {}, filename = null) => {
    const queryString = toQueryParams(params);
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const response = await axiosInstance.get(fullUrl, {
      responseType: 'blob',
    });

    // If filename provided, trigger download
    if (filename) {
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    }

    return response.data;
  },
};

export default apiService;
