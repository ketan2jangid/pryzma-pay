import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { addFund, verifyTransfer } from "../controllers/onramp.controller";

const router = Router();

router.post("/addFund", authMiddleware, addFund);
router.post("/verifyTransfer", verifyTransfer);

export default router;