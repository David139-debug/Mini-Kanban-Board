import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleRegister = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        if (!data) return res.sendStatus(400);

        let foundUser = await User.findOne({ email: data.email });
        
        if (foundUser) return res.status(400).json({ message: "Email already exist." });

        const hashedPw = await bcrypt.hash(data.password, 7);
        const newUser = new User({
            fullname: data.fullname,
            email: data.email,
            password: hashedPw
        });
        await newUser.save();

        const accessToken = jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "15min" }
        );

        const refreshToken = jwt.sign(
            { id: newUser._id },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: "7d" }
        );

        res.status(200).json({ accessToken, refreshToken, newUser });
    } catch (err) {
        res.status(500).json({ message: "Error occurred" });
    }
};

export default { handleRegister }