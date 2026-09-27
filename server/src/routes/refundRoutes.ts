import { Router } from "express";

import { createRefundRequest } from "../controllers/refundController.js";

const router = Router();

router.post("/refunds", createRefundRequest);

export default router;