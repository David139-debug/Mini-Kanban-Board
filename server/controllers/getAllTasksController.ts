import Task from "../model/Task";
import { Request, Response } from "express";

const getAllTasks = async (req: Request, res: Response) => {
    try {
        let foundTasks = await Task.find();
        res.status(200).json(foundTasks);
    } catch (err) {
        res.status(500).json({ message: "Error occurred" })
    }
};

export default { getAllTasks }