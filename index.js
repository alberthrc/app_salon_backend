import express from "express"

import dotenv from "dotenv"

import colors from "colors"

import servicesRoutes from "./routes/servicesRoutes.js"

import { db } from "./config/db.js"

//Variable de entorno
dotenv.config()


//Configurar App
const app = express()

//Leer datos via body
app.use(express.json())

//Establecer la conexión a la base de datos y verificar si estás conectado
db()


//Definir ruta
app.use("/api/services", servicesRoutes)

//Definir puerto
const PORT = process.env.PORT || 4000;


//Arrancar App
app.listen(PORT, function() {
    console.log( colors.blue.bold('Servidor web escuchando en el puerto:'), PORT);
  });