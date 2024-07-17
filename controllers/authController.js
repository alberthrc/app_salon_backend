import User from '../models/User.js'

import { sendEmailVerification } from '../emails/authEmailServices.js'

import { generateJWT, uniqueId } from '../utils/index.js'

const register = async (req, res) => {

    //Validando todos los campos
    if(Object.values(req.body).some(value => value === '')){
        return res.status(400).json({
            msg: 'Todos los campos son obligatorios'
        })
    }

    const { email, password, name } = req.body

    //Evitar registros duplicados

    const userExists = await User.findOne({ email  })
    if(userExists){
        return res.status(400).json({msg: 'El usuario ya está registrado'})
    }

    //Validar la extensión del password
    const MIN_PASSWORD_LENGTH = 8
    if(password.trim().length < MIN_PASSWORD_LENGTH){
        return res.status(400).json({msg: `La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`})
    }

    try {
        const user = new User(req.body)
        const result = await user.save()

        console.log(result)

        const { name, email, token } = result

        sendEmailVerification({name, email, token})

        res.json({msg: 'Usuario registrado correctamente, revisa tu email'})

    } catch (error) {
        console.log(error)
    }
}


const verifyAccount = async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if(!user){
        const  error = new Error('Hubo un error, token no válido')
        return res.status(401).json({msg: error.message})
    }

    //Si el token es válido, confirma la cuenta

    try {
        user.verified = true
        user.token = ''
        await user.save()
        res.json({msg: 'Usuario verificada correctamente'})
        
    } catch (error) {
        console.log(error)
    }
}    

const login = async (req, res) => {
    const { email, password } = req.body
    //Revisar si el usuario existe
    const user = await User.findOne({ email })
    if(!user){
        const  error = new Error('El usuario no existe')
        return res.status(401).json({msg: error.message})
    }
    
    //Revisar si el usuario confirmo la cuneta

    if(!user.verified){
        const  error = new Error('Tu cuenta no ha sido confirmada, revisa tu email')
        return res.status(401).json({msg: error.message})
    }

    
    //Comprobar el password
    if( await user.checkPassword(password)){

        const token =  generateJWT(user._id);
        //console.log(token)

        res.json({ token })
       
    } else {
        const  error = new Error('La contraseña es incorrecta')
        return res.status(401).json({msg: error.message})    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body
    // Comprobar si existe el usuario

    const user = await User.findOne({ email }) 

    if(!user) {
        const  error = new Error('El usuario no exiser')
        return res.status(404).json({msg: error.message})   
    }

    try {
        user.token = uniqueId()
        await user.save()

        res.json({
            msg: 'Hemos enviado un email con las intrucciones'
        })
        
    } catch (error) {
        console.log(error)
    }
}

const user = async (req, res) => {
   const { user } = req
    res.json(
        user
    )
}

export {
    register,
    verifyAccount,
    login,
    forgotPassword,
    user
}