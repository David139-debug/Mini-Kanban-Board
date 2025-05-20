import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const refreshToken = async (req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken;
    try {
        if (!refreshToken) {
            return res.sendStatus(401);
        }

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string) as jwt.JwtPayload;
        const foundUser = await User.findById(decoded.id);
        if (!foundUser) return res.status(402).json({ message: "User not found." });

        const newAccessToken = jwt.sign(
            { id: foundUser._id, email: foundUser.email },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "15min" }
        );
        return res.status(200).json(newAccessToken);
    } catch (err) {
        console.log(err);
        res.sendStatus(403);
    }
};

export default { refreshToken }