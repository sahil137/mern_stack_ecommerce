import ErrorHandler from '../utils/errorHandler.js';

export const errorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'Internal server Error';

  if (error.name == 'CastError') {
    const message = `Resource not found: ${error.path}`;
    error = new ErrorHandler(message, 404);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
