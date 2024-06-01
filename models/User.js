import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { uniqueId } from "../utils/index.js";

const userShema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    token: {
        type: String,
        default: () => uniqueId(),
    },
    verified: {
        type: Boolean,
        default: false,
    },
    admin: {
        type: Boolean,
        default: false,
    },
});

userShema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userShema.methods.checkPassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model("User", userShema);


export default User;