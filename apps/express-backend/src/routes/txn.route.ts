import { Router } from "express";
import { allTransactions, receivedTransactions, sentTransactions, transferFunds } from "../controllers/txn.controller";

const router = Router();

router.get("/allTxns", allTransactions);
router.get("/sentTxns", sentTransactions);
router.get("/receivedTxns", receivedTransactions);

router.post("/transfer", transferFunds);

export default router;