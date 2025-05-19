const express = require("express");
const router = express.Router();
import deleteTaskController from "../controllers/deleteTaskController";

router.delete("/:id", deleteTaskController.deleteTask);

export default router