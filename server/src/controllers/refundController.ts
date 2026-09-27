import { Request, Response } from "express";

import RefundPolicyService from "../services/refundPolicyService.js";

import RefundRequest from "../models/RefundRequest.js";

import AuditLog from "../models/AuditLog.js";
import AIService from "../services/aiService.js";
import { refundValidationSchema } from "../utils/refundValidation.js";

const refundPolicyService = new RefundPolicyService();
const aiService = new AIService();
export const createRefundRequest = async (req: Request, res: Response) => {
  const { customerId, orderId, message } = refundValidationSchema.parse(req.body);

  const result = await refundPolicyService.evaluateRefundRequest(
    customerId,
    orderId,
  );

  const aiResult = await aiService.analyzeRefundRequest(message, result.order, {
    decision: result.decision,
    refundAmount: result.refundAmount,
    reason: result.reason,
  });

  const refundRequest = await RefundRequest.create({
    customerId,
    orderId,
    message,
    decision: result.decision,
    refundAmount: result.refundAmount,
    aiClassification: aiResult.classification,
    aiReasoning: aiResult.reasoning,
    customerResponse: aiResult.customerResponse,
  });

  await AuditLog.create({
    refundRequestId: refundRequest._id,
    event: "Refund Request Created",
    details: `Decision: ${result.decision}, Refund Amount: ${result.refundAmount}, Reason: ${result.reason}`,
  });

  res.json(refundRequest);
};
