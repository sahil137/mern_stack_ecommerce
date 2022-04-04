import express from 'express';
import {
  deleteUser,
  forgotPassword,
  getAllUsers,
  getSingleUser,
  getUserDetails,
  resetPassword,
  signIn,
  signOut,
  signUp,
  updatePassword,
  updateProfile,
  updateUserRole,
} from '../controllers/userController.js';
import { isUserAuthenticated, userAuthRoles } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', signUp);
router.post('/login', signIn);
router.get('/logout', signOut);
router.post('/password/forgot', forgotPassword);
router.post('/password/reset/:token', resetPassword);
router.patch('/password/update', isUserAuthenticated, updatePassword);
router.get('/userProfile', isUserAuthenticated, getUserDetails);
router.patch('/userProfile/update', isUserAuthenticated, updateProfile);

router.get(
  '/admin/getAllUsers',
  isUserAuthenticated,
  userAuthRoles('admin'),
  getAllUsers
);
router.get(
  '/admin/getSingleUser/:id',
  isUserAuthenticated,
  userAuthRoles('admin'),
  getSingleUser
);

router.patch(
  '/admin/updateUserRole/:id',
  isUserAuthenticated,
  userAuthRoles('admin'),
  updateUserRole
);
router.delete(
  '/admin/deleteUser/:id',
  isUserAuthenticated,
  userAuthRoles('admin'),
  deleteUser
);

export default router;
