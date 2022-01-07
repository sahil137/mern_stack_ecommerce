// Create token and
import jwt from 'jsonwebtoken';
export const sendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );

  const options = {
    // cookie expires after 1 day
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
};
