import mongoose, { Document, Schema } from "mongoose";

export interface IRefundRequest extends Document {
  customerId: mongoose.Types.ObjectId;
  orderId: mongoose.Types.ObjectId;
  message: string;
  decision: "Approved" | "Denied" | "Escalated";
  refundAmount: number;
  aiClassification?: string;
  aiReasoning?: string;
  customerResponse?: string;
  createdAt: Date;
}

const refundRequestSchema = new Schema<IRefundRequest>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    message: { type: String, required: true, trim: true },
    decision: {
      type: String,
      enum: ["Approved", "Denied", "Escalated"],
      required: true,
    },
    refundAmount: { type: Number, required: true, min: 0 },
    aiClassification: { type: String },
    aiReasoning: { type: String },
    customerResponse: { type: String },
  },
  { timestamps: true },
);

const RefundRequest = mongoose.model<IRefundRequest>(
  "RefundRequest",
  refundRequestSchema,
);

export default RefundRequest;
