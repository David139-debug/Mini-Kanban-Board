const express = require("express");
const router = express.Router();
import getAllTasksController from "../controllers/getAllTasksController";

router.get("/", getAllTasksController.getAllTasks);

export default router