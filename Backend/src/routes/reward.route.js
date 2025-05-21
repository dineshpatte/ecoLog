
import express from 'express';
import { checkAndGiveReward } from '../controllers/reward.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/check-daily-reward', verifyJWT, checkAndGiveReward);

export default router;
