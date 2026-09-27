export interface RefundResult {
  _id: string;
  customerId: string;
  orderId: string;
  message: string;
  decision: "Approved" | "Denied" | "Escalated";
  refundAmount: number;
  aiClassification?: string;
  aiReasoning?: string;
  customerResponse?: string;
  createdAt: string;
}
