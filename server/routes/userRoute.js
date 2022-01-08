import express from 'express';
import {
  forgotPassword,
  resetPassword,
  signIn,
  signOut,
  signUp,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', signUp);
router.post('/login', signIn);
router.get('/logOut', signOut);
router.post('/password/forgot', forgotPassword);
router.post('/password/reset/:token', resetPassword);

export default router;
