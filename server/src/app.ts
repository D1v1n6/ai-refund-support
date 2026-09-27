import express from "express";
import cors from "cors";
import refundRoutes from "./routes/refundRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", refundRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "AI Refund Support API is running" });
});

export default app;
