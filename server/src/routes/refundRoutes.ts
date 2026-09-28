import { Router } from "express";

import { createRefundRequest, getRefundRequests } from "../controllers/refundController.js";

const router = Router();

router.post("/refunds", createRefundRequest);
router.get("/refunds", getRefundRequests);

export default router;