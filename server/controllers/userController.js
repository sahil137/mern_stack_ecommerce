import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler.js';
import User from '../models/userModel.js';
import { sendToken } from '../utils/jwtToken.js';

// Register/Create the user
export const signUp = async (req, res, next) => {
  const { email, password, name, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new ErrorHandler('User already exists', 404));
    }
    if (password !== confirmPassword) {
      return next(new ErrorHandler('Passwords dont match', 404));
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      avatar: {
        public_id: 'sample id',
        url: 'sample url',
      },
    });

    // send jwt token using sendToken
    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login/signin the user
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return next(new ErrorHandler('Please Enter Email & Password', 400));
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return next(new ErrorHandler('User does not exists', 404));
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return next(new ErrorHandler('Invalid credentials', 400));
    }
    sendToken(existingUser, 200, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
