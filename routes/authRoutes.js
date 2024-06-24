import express from 'express';

import { register, verifyAccount, login, user } from '../controllers/authController.js';

import authMiddleware from '../middleware/authMiddleware.js';


const router = express.Router();


//Rutas de autenticación y registro de usuario
router.post('/register', register);
router.get('/verify/:token', verifyAccount)
router.post('/login', login)



// Area privada - Requiere JWT
router.get('/user', authMiddleware, user)

export default router;