import { Request, Response } from "express";
import Task from "../model/Task";

const deleteTask = async (req: Request, res: Response) => {
    try {
        let foundTask = await Task.findOneAndDelete({ id: req.params.id });
        if (!foundTask) {
            return res.status(400).json({ message: "Task not found." });
        }
        res.status(200).json(foundTask);
    } catch (err) {
        res.status(500).json({ message: "Error occurred"  })
    }
};

export default { deleteTask }