const express = require("express");
const router = express.Router();
import updateTaskController from "../controllers/updateTaskController";

router.put("/", updateTaskController.updateTask);

export default router