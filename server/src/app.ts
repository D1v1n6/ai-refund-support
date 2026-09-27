import express from "express";
import cors from "cors";
import refundRoutes from "./routes/refundRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", refundRoutes);
app.use(errorMiddleware);

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "AI Refund Support API is running" });
});

export default app;
