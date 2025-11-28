/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'long', 'time', 'datetime')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '';

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) return '';

  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    datetime: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  };

  return d.toLocaleDateString('en-US', options[format] || options.short);
};

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined) return '';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  if (num === null || num === undefined) return '';
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Truncate text
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Get initials from name
 * @param {string} name - Full name
 * @returns {string} Initials
 */
export const getInitials = (name) => {
  if (!name) return '';

  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
};

/**
 * Generate random color
 * @returns {string} Hex color code
 */
export const getRandomColor = () => {
  const colors = [
    '#1976d2',
    '#dc004e',
    '#9c27b0',
    '#f57c00',
    '#388e3c',
    '#d32f2f',
    '#0288d1',
    '#7b1fa2',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') return obj;
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean} True if empty
 */
export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Convert object to query parameters string
 * @param {Object} params - Object to convert to query params
 * @param {Object} options - Options for conversion
 * @param {boolean} options.skipNull - Skip null/undefined values (default: true)
 * @param {boolean} options.arrayFormat - Format for arrays: 'bracket' (key[]=val) or 'repeat' (key=val&key=val) (default: 'bracket')
 * @returns {string} Query parameters string (without leading '?')
 * @example
 * toQueryParams({ name: 'John', age: 30, tags: ['a', 'b'] })
 * // Returns: "name=John&age=30&tags[]=a&tags[]=b"
 */
export const toQueryParams = (params, options = {}) => {
  const { skipNull = true, arrayFormat = 'bracket' } = options;

  if (!params || typeof params !== 'object') return '';

  const queryParts = [];

  Object.entries(params).forEach(([key, value]) => {
    // Skip null/undefined if option is enabled
    if (skipNull && (value === null || value === undefined)) {
      return;
    }

    // Handle arrays
    if (Array.isArray(value)) {
      if (value.length === 0 && skipNull) return;

      value.forEach((item) => {
        if (skipNull && (item === null || item === undefined)) return;

        const encodedKey =
          arrayFormat === 'bracket' ? `${encodeURIComponent(key)}[]` : encodeURIComponent(key);
        queryParts.push(`${encodedKey}=${encodeURIComponent(item)}`);
      });
      return;
    }

    // Handle objects (convert to JSON string)
    if (typeof value === 'object') {
      queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`);
      return;
    }

    // Handle primitive values
    queryParts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  });

  return queryParts.join('&');
};
