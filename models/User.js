import mongoose from "mongoose";
import { uniqueId } from "../utils";

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

const User = mongoose.model("User", userShema);


export default User;