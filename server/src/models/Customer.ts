import mongoose, { Document } from "mongoose";

export interface ICustomer extends Document{
    name: string;
    email: string;
    phone: string;
    createdAt: Date;
}

const customerSchema = new mongoose.Schema<ICustomer>({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },}, { timestamps: true });

const Customer = mongoose.model<ICustomer>("Customer", customerSchema);

export default Customer;