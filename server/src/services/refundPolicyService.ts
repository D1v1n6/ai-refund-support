import Order from "../models/Order.js";

type RefundDecision = "Approved" | "Denied" | "Escalated";

class RefundPolicyService {
  async evaluateRefundRequest(
    customerId: string,
    orderId: string,
  ): Promise<{
    decision: RefundDecision;
    refundAmount: number;
    reason: string;
    order: {
      productName: string;
      amount: number;
      orderDate: Date;
      status: string;
      isFinalized: boolean;
    };
  }> {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("Order not found");
    }

    if (order.customerId.toString() !== customerId) {
      throw new Error("Customer not authorized for this order");
    }

    if (order.isFinalized) {
      return {
        decision: "Denied",
        refundAmount: 0,
        reason:
          "This order is marked as final sale and is not eligible for a refund.",
        order,
      };
    }

    if (order.status === "Cancelled") {
      return {
        decision: "Denied",
        refundAmount: 0,
        reason: "This order was cancelled and is not eligible for a refund.",
        order,
      };
    }

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    if (order.orderDate < thirtyDaysAgo) {
      return {
        decision: "Denied",
        refundAmount: 0,
        reason:
          "This order was placed more than 30 days ago and is not eligible for a refund.",
        order,
      };
    }

    if (order.amount > 500) {
      return {
        decision: "Escalated",
        refundAmount: 0,
        reason:
          "This order exceeds the $500 threshold and requires manual review.",
        order,
      };
    }

    return {
      decision: "Approved",
      refundAmount: order.amount,
      reason: "This order meets the refund criteria.",
      order,
    };
  }
}

export default RefundPolicyService;
