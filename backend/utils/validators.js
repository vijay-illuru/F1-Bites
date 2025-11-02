/**
 * Input validation utilities
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - { valid: boolean, message: string }
 */
function validatePassword(password) {
  if (!password) {
    return { valid: false, message: 'Password is required' };
  }

  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }

  if (password.length > 128) {
    return { valid: false, message: 'Password must be less than 128 characters' };
  }

  // Check for at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  if (!hasLetter || !hasNumber) {
    return { 
      valid: false, 
      message: 'Password must contain at least one letter and one number' 
    };
  }

  return { valid: true, message: 'Password is valid' };
}

/**
 * Sanitize string input (basic XSS prevention)
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
function sanitizeString(input) {
  if (typeof input !== 'string') return input;
  
  // Remove potentially dangerous characters
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * Validate MongoDB ObjectId format
 * @param {string} id - ID to validate
 * @returns {boolean} - True if valid ObjectId format
 */
function isValidObjectId(id) {
  const ObjectId = require('mongoose').Types.ObjectId;
  return ObjectId.isValid(id);
}

module.exports = {
  isValidEmail,
  validatePassword,
  sanitizeString,
  isValidObjectId
};

