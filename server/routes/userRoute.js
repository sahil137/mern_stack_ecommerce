import express from 'express';
import { signIn, signOut, signUp } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', signUp);
router.post('/login', signIn);
router.get('/logOut', signOut);

export default router;
