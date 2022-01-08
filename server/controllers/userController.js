import bcrypt from 'bcrypt';
import ErrorHandler from '../utils/errorHandler.js';
import User from '../models/userModel.js';
import { sendToken } from '../utils/jwtToken.js';
import sendResetPasswordEmail from '../utils/nodemailer.js';
import crypto from 'crypto';

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

// Logout the user
export const signOut = async (req, res, next) => {
  try {
    res.cookie('token', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: 'Logged Out',
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// Forgot Password
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler('User not found', 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/password/reset/${resetToken}`;

  const message = `Click here to reset your password:- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendResetPasswordEmail({
      email: user.email,
      subject: `Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    // reset password token and passwordExpire to undefined
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
};

// reset password
export const resetPassword = async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  try {
    // get the token from req.params and use it to find user in db
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return next(new ErrorHandler('Reset token is invalid/expired', 404));
    }

    if (password !== confirmPassword) {
      return next(new ErrorHandler('Password dont match', 404));
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;

    // changing them to undefined
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get user details

export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// update user password
export const updatePassword = async (req, res, next) => {
  const { confirmPassword, newPassword, confirmNewPassword } = req.body;
  try {
    const user = await User.findById(req.user.id);

    const isPasswordCorrect = await bcrypt.compare(
      confirmPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return next(new ErrorHandler('Incorrect password entered', 400));
    }
    if (newPassword !== confirmNewPassword) {
      return next(new ErrorHandler('Password does not match', 400));
    }
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// update user details
export const updateProfile = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const newUserData = {
      name,
      email,
    };
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get all users :: ADMIN
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get single user with id :: ADMIN
export const getSingleUser = async (req, res, next) => {
  const { id } = req.params.id;
  try {
    const user = await User.find(id);
    if (!user) {
      return next(new ErrorHandler(`User does not exist with id: ${id}`));
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// update user role :: ADMIN
export const updateUserRole = async (req, res, next) => {
  const { name, email, role } = req.body;
  const { id } = req.params;
  try {
    const newUserData = {
      name,
      email,
      role,
    };
    await User.findByIdAndUpdate(id, newUserData, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// delete user :: ADMIN
export const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return next(new ErrorHandler(`User doesnot exist with id: ${id}`));
    }
    await user.remove();
    res
      .status(200)
      .json({ success: true, message: 'User Deleted Successfully' });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};
