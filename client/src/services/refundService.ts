const refundService = async ({
  customerId,
  orderId,
  message,
}: {
  customerId: string;
  orderId: string;
  message: string;
}) => {
  try {
    const response = await fetch("http://localhost:5000/api/refunds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
        orderId,
        message,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to submit refund request");
    }
    return response.json();
  } catch (error) {
    console.error("Error in refundService:", error);
    throw error;
  }
};

export default refundService;
