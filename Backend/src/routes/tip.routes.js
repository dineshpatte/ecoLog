import express from "express";
import { generateDailyTips, getTipsByDate } from "../controllers/tip.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();



router.post("/generate", verifyJWT,generateDailyTips);

router.get("/get",verifyJWT, getTipsByDate);

export default router;
