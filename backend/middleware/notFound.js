/**
 * 404 Not Found middleware
 * Handles routes that don't exist
 */
const notFound = (req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
};

module.exports = notFound;

