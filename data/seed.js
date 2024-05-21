import colors from "colors"

import { db } from "../config/db.js"

import dotenv from "dotenv"

import Services from "../models/Services.js"

import { services } from "../data/beautyServices.js"


//Variable de entorno
dotenv.config()

await db()


async function seedDB() {
    try {
        await Services.insertMany(services)
        console.log(colors.green.bold("Se agregaron correctamente"))
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


async function clearDB() {
    try {
        await Services.deleteMany()
        console.log(colors.red.bold("Se eliminaron los datos"))
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


if(process.argv[2] === "--import"){
    seedDB()
} else{
    clearDB()
}