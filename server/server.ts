import express from "express"
import mongoose from "mongoose";
import cors from "cors"
import connectDB from "./config/connectDB"
import dotenv from "dotenv"
import createTaskRoute from "./routes/createTask";
import getTasksRoute from "./routes/getTasks";
import updateTaskRoute from "./routes/updateTask";
import deleteTaskRoute from "./routes/deleteTask";
import editTaskRoute from "./routes/editTask"
dotenv.config();
const PORT = process.env.PORT;
const corsOptions = {
    origin: "http://localhost:5173"
};

connectDB();
const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/createTask", createTaskRoute);
app.use("/api/getTasks", getTasksRoute);
app.use("/api/updateTask", updateTaskRoute);
app.use("/api/deleteTask", deleteTaskRoute);
app.use("/api/editTask", editTaskRoute);

mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    });
});