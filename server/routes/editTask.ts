const express = require("express");
const router = express.Router();
import editTaskController from "../controllers/editTaskController";

router.put("/:id", editTaskController.handleEditTask);

export default router