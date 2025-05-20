const express = require("express");
const router = express.Router();
import loginController from "../controllers/loginController";

router.post("/", loginController.handleLogin);

export default router