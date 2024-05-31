import User from '../models/User.js'

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
        await user.save()
        res.json({msg: 'Usuario registrado correctamente, revisa tu email'})

    } catch (error) {
        console.log(error)
    }
}



export {
    register
}