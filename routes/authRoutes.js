import express from 'express';

import { register, verifyAccount, login } from '../controllers/authController.js';


const router = express.Router();


//Rutas de autenticación y registro de usuario
router.post('/register', register);
router.get('/verify/:token', verifyAccount)
router.post('/login', login)




export default router;