import mongoose from "mongoose";
import { Request, Response } from "express";

const connectDB = async () => {
    try {
       await mongoose.connect(process.env.MONGO_URI as string);
    } catch (err) {
        console.error(err);
    }
};

export default connectDB