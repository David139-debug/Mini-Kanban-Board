const express = require("express");
const router = express.Router();
import registerController from "../controllers/registerController";

router.post("/", registerController.handleRegister);

export default router