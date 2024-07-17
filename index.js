import express from "express"

import dotenv from "dotenv"

import colors from "colors"

import cors from "cors"

import { db } from "./config/db.js"

import servicesRoutes from "./routes/servicesRoutes.js"

import authRoutes from "./routes/authRoutes.js"

import appoinmentRoutes from "./routes/appoinmentRoutes.js"

import userRoutes from "./routes/userRoutes.js"


//Variable de entorno
dotenv.config()


//Configurar App
const app = express()

//Leer datos via body
app.use(express.json())

//Establecer la conexión a la base de datos y verificar si estás conectado
db()

//Configurar CORS

const whitelist = [process.env.FRONTEND_URL, undefined] //quitar el undifine antes de llevar a produccción
const corsOption = {
  origin: function(origin, callback) {
    if(whitelist.includes(origin)){
      //Permite la conexicón
      callback(null, true)
    }else{
      //No permite la conexicón

        callback(new Error('Error de CORS'))
    }
  }
}

app.use(cors(corsOption))


//Definir ruta
app.use("/api/services", servicesRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/appoinments", appoinmentRoutes)
app.use("/api/users", userRoutes  )


//Definir puerto
const PORT = process.env.PORT || 4000;


//Arrancar App
app.listen(PORT, function() {
    console.log( colors.blue.bold('Servidor web escuchando en el puerto:'), PORT);
  });