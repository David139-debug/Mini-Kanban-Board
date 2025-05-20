import Task from "../models/Task";
import { Request, Response } from "express";

const updateTask = async (req: Request, res: Response) => {
    const { id, status } = req.body;
    try {
        const task = await Task.findOneAndUpdate(
            { id: id },
            { status: status },
            { new: true }
        );
        
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ message: "Error occurred" });
    }
};

export default { updateTask }