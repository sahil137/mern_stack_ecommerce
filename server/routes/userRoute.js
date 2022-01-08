import express from 'express';
import {
  forgotPassword,
  getUserDetails,
  resetPassword,
  signIn,
  signOut,
  signUp,
  updatePassword,
} from '../controllers/userController.js';
import { isUserAuthenticated, userAuthRoles } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', signUp);
router.post('/login', signIn);
router.get('/logOut', signOut);
router.post('/password/forgot', forgotPassword);
router.post('/password/reset/:token', resetPassword);
router.patch('/password/update', isUserAuthenticated, updatePassword);
router.get('/userProfile', isUserAuthenticated, getUserDetails);

export default router;
