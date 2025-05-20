import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const handleLogin = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const foundUser = await User.findOne({ email: data.email });
        const matchedPw = await bcrypt.compare(data.password as string, foundUser?.password as string)
        if (!matchedPw || !foundUser) {
            return res.status(400).json({ message: "Wrong data entered." });
        }

        const accessToken = jwt.sign(
            { id: foundUser._id, email: foundUser.email },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "15min" }
        )

        const refreshToken = jwt.sign(
            { id: foundUser._id },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: "7d" }
        )

        return res.status(201).json({ accessToken, refreshToken, foundUser });
    } catch (err) {
        res.status(500).json(err);
    }
};

export default { handleLogin }