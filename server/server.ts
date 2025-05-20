import express from "express"
import mongoose from "mongoose";
import cors from "cors";
import connectDB from "./config/connectDB";
import dotenv from "dotenv";
import createTaskRoute from "./routes/createTask";
import getTasksRoute from "./routes/getTasks";
import updateTaskRoute from "./routes/updateTask";
import deleteTaskRoute from "./routes/deleteTask";
import editTaskRoute from "./routes/editTask";
import registerRoute from "./routes/register";
import refreshRoute from "./routes/refreshToken"
import getUserRoute from "./routes/getUser";
import loginRoute from "./routes/login"
dotenv.config();
const PORT = process.env.PORT;
const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:4173"],
    allowedHeaders: ["Content-Type", "Authorization"]
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
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);
app.use("/api/refresh", refreshRoute);
app.use("/api/getUser", getUserRoute);

mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    });
});