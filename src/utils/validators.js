/**
 * Email validation
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Phone number validation (US format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\d\s\-()]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

/**
 * URL validation
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const isValidUrl = (url) => {
  try {
     
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Password strength validation
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with strength level
 */
export const validatePassword = (password) => {
  const result = {
    isValid: false,
    strength: 'weak',
    errors: [],
  };

  if (!password) {
    result.errors.push('Password is required');
    return result;
  }

  if (password.length < 8) {
    result.errors.push('Password must be at least 8 characters');
  }

  if (!/[a-z]/.test(password)) {
    result.errors.push('Password must contain lowercase letter');
  }

  if (!/[A-Z]/.test(password)) {
    result.errors.push('Password must contain uppercase letter');
  }

  if (!/\d/.test(password)) {
    result.errors.push('Password must contain number');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    result.errors.push('Password must contain special character');
  }

  result.isValid = result.errors.length === 0;

  // Calculate strength
  if (result.isValid) {
    if (password.length >= 12) {
      result.strength = 'strong';
    } else if (password.length >= 10) {
      result.strength = 'medium';
    }
  }

  return result;
};

/**
 * Required field validation
 * @param {any} value - Value to validate
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} Error message or null if valid
 */
export const validateRequired = (value, fieldName = 'This field') => {
  if (value === null || value === undefined || value === '') {
    return `${fieldName} is required`;
  }
  return null;
};

/**
 * Min length validation
 * @param {string} value - Value to validate
 * @param {number} minLength - Minimum length
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} Error message or null if valid
 */
export const validateMinLength = (value, minLength, fieldName = 'This field') => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters`;
  }
  return null;
};

/**
 * Max length validation
 * @param {string} value - Value to validate
 * @param {number} maxLength - Maximum length
 * @param {string} fieldName - Field name for error message
 * @returns {string|null} Error message or null if valid
 */
export const validateMaxLength = (value, maxLength, fieldName = 'This field') => {
  if (value && value.length > maxLength) {
    return `${fieldName} must not exceed ${maxLength} characters`;
  }
  return null;
};
