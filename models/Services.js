import mongoose from "mongoose";


const servicesShema = mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true,
    },
    price: {
        type: Number,
        require: true,
        trim: true,
    },

})

const Services = mongoose.model("Services", servicesShema )


export default Services; 