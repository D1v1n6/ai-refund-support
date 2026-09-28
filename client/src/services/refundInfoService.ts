const refundInfoService = async () => {
  try {
    const response = await fetch("http://localhost:5000/api/refunds", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to get refund requests");
    }

    return response.json();
  } catch (error) {
    console.log("Something went wrong", error);
    throw error;
  }
};

export default refundInfoService;