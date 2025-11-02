/**
 * Simple logger utility
 * Provides structured logging with different log levels
 */

const isDevelopment = process.env.NODE_ENV === 'development';

const logger = {
  info: (...args) => {
    if (isDevelopment) {
      console.log('[INFO]', ...args);
    }
  },

  error: (...args) => {
    console.error('[ERROR]', ...args);
  },

  warn: (...args) => {
    console.warn('[WARN]', ...args);
  },

  debug: (...args) => {
    if (isDevelopment) {
      console.log('[DEBUG]', ...args);
    }
  }
};

module.exports = logger;

