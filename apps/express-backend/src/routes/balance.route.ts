import { Router } from "express";
import { checkBalance } from "../controllers/balance.controller";
import authMiddleware from "../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);
router.get("/checkBalance", checkBalance);

export default router;