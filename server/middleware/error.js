export const errorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'Internal server Error';

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
  });
};
