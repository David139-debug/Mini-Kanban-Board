import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

const handleUser = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader) return res.sendStatus(401);

        const splited = authHeader.split(" ");
        const token = splited[1];

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
        const foundUser = await User.findOne({ _id: decoded.id });
        if (!foundUser) return res.status(400).json({ message: "User not found." });
        return res.status(201).json(foundUser);
    } catch (err) {
        res.status(500).json(err);
    }
};

export default { handleUser }