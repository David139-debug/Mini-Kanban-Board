import { Request, Response } from "express";
import Task from "../model/Task";

const handleEditTask = async (req: Request, res: Response) => {
    const { name } = req.body;
    const id = req.params;
    console.log(name)
    try {
        let foundTask = await Task.findOneAndUpdate(id, { title: name }, { new: true })
        if (!foundTask) {
            return res.status(400).json({ message: "Task not found." });
        }
        res.status(201).json(foundTask);
    } catch (err) {
        res.status(500).json({ message: "Error occurred" })
    }
}

export default { handleEditTask }