const express = require("express");
const router = express.Router();
import getUserController from "../controllers/getUserController";

router.get("/", getUserController.handleUser);

export default router