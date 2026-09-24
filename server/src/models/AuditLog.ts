import mongoose, { Document, Schema } from "mongoose";

export interface IAuditLog extends Document {
  refundRequestId: mongoose.Types.ObjectId;
  event: string;
  details?: string;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>(
  {
    refundRequestId: {
      type: Schema.Types.ObjectId,
      ref: "RefundRequest",
      required: true,
    },

    event: {
      type: String,
      required: true,
      trim: true,
    },

    details: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const AuditLog = mongoose.model<IAuditLog>("AuditLog", auditLogSchema);

export default AuditLog;