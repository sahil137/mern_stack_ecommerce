import ErrorHandler from '../utils/errorHandler.js';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// To check if user if logged in
export const isUserAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return next(
        new ErrorHandler('Please login to access this resource', 401)
      );
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// check if user matches the passed role
export const userAuthRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} role is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
