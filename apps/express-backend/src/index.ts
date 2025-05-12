import "dotenv/config";
import express from "express";
import appRouter from "./routes/main.route";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", appRouter);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));