import mongoose from "mongoose";

import colors from "colors"



export const db = async () => {

    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        const URL = `${db.connection.host}:${db.connection.port}`
        console.log(colors.green.bold(`MongoDB se conectó correctamente: ${URL}`))
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1); 
    }

}