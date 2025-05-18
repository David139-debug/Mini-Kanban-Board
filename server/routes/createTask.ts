const express = require("express");
const router = express.Router();
import createTaskController from "../controllers/createTaskController";

router.post("/", createTaskController.createTask);

export default router