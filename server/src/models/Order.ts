import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
  customerId: mongoose.Types.ObjectId;
  productName: string;
  orderNumber: string;
  amount: number;
  orderDate: Date;
  status: "Delivered" | "Processing" | "Cancelled";
  isFinalized: boolean;
  createdAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    productName: { type: String, required: true, trim: true },
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    amount: { type: Number, required: true, min: 0 },
    orderDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["Delivered", "Processing", "Cancelled"],
      required: true,
    },
    isFinalized: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
