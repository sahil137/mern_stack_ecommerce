import ErrorHandler from '../utils/errorHandler.js';

export const errorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'Internal server Error';

  if (error.name == 'CastError') {
    const message = `Resource not found: ${error.path}`;
    error = new ErrorHandler(message, 404);
  }
  // Mongoose duplicate key error
  if (error.code == 11000) {
    const message = `Duplicate ${Object.keys(error.keyValue)} Entered`;
    error = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (error.name === 'JsonWebTokenError') {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (error.name === 'TokenExpiredError') {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
