import { Router } from "express";
import authRouter from "./auth.route";
import txnRouter from "./txn.route";
import authMiddleware from "../middlewares/auth.middleware";
import balanceRouter from "./balance.route";
import onRampRouter from "./onramp.route";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/onRampTxn", onRampRouter);

appRouter.use(authMiddleware);
appRouter.use("/transactions", txnRouter);
appRouter.use("/balance", balanceRouter);

export default appRouter;