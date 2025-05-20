const express = require("express");
const router = express.Router();
import refreshController from "../controllers/refreshToken";

router.post("/", refreshController.refreshToken);

export default router;