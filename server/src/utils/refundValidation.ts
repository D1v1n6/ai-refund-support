import { z } from "zod";

export const refundValidationSchema = z.object({
  customerId: z.string().nonempty("Customer ID is required"),
  orderId: z.string().nonempty("Order ID is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});
