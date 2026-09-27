import { useState } from "react";
import refundService from "../services/refundService";
import type { RefundResult } from "../types/refund";

const CustomerRefund = () => {
  const [customerId, setCustomerId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<RefundResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const decisionStyles = {
    Approved: "bg-green-500 text-white",
    Denied: "bg-red-500 text-white",
    Escalated: "bg-yellow-500 text-black",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    setError("");
    setResult(null);

    try {
      const response = await refundService({
        customerId,
        orderId,
        message,
      });

      console.log(response);
      setResult(response);
    } catch (error) {
      setError("Unable to process your refund request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen
bg-slate-950
text-white
max-w-xl
mx-auto
md:p-6
p-2
rounded-xl
bg-slate-900
md:border
border-slate-800"
    >
      <h1 className="text-xl text-blue-400">Refund Support</h1>
      <div className="mt-4 flex flex-col gap-2 justify-center items-center text-sm">
        <h2>Request a Refund</h2>
        <h2>Tell us what happened with your order</h2>
      </div>
      {error && (
        <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl mt-6 flex flex-col gap-4 border border-slate-800 bg-slate-900 p-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="customerId">Customer ID</label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            className="rounded-lg p-2 bg-slate-800 text-white placeholder:text-slate-500 border border-slate-600 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="orderId">Order ID</label>
          <input
            type="text"
            id="orderId"
            name="orderId"
            className="rounded-lg p-2 bg-slate-800 text-white placeholder:text-slate-500 border border-slate-600 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="message">What Happened?</label>
          <textarea
            id="message"
            name="message"
            className="rounded-lg p-2 bg-slate-800 text-white placeholder:text-slate-500 border border-slate-600 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe the issue with your order"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {loading ? (
          <button
            type="submit"
            disabled
            className="bg-blue-500 opacity-50 text-white rounded-lg p-2 hover:bg-blue-600 transition-colors"
          >
            Submitting
          </button>
        ) : (
          <button
            type="submit"
            className="cursor-pointer bg-blue-500 text-white rounded-lg p-2 hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        )}
      </form>
      {result && (
        <div className="mt-6 rounded-xl border border-slate-800 bg-slate-800 p-4 flex flex-col gap-2 justify-center items-center">
          <h1 className="text-xl font-bold mb-4">Refund Request Result</h1>
          <p
            className={`rounded-lg p-3 text-lg ${decisionStyles[result.decision]}`}
          >
            {result.decision}
          </p>
          <div className="flex flex-col justify-center items-center">
            Refund Amount:
            <p>${result.refundAmount}</p>
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">Response</h2>
            <p>{result.customerResponse}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-lg font-semibold">AI Analysis</h2>
            <p>Classification: {result.aiClassification}</p>
            <p>Reasoning: {result.aiReasoning}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerRefund;
