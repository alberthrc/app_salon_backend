import express from 'express';

import { register } from '../controllers/authController.js';


const router = express.Router();


//Rutas de autenticación y registro de usuario
router.post('/register', register);




export default router;