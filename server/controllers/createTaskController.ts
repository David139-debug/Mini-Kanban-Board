import { Request, Response } from "express";
import Task from "../model/Task";

const createTask = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const newTask = new Task({
            title: data.title,
            status: data.status,
            completed: data.completed ?? false,
            id: data.id
        });
        await newTask.save();
        return res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json({ message: "Error occurred" })
    }
};

export default { createTask };