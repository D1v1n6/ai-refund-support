import { useState } from "react";

interface CreateRefundFormProps {
  onRefundCreated: () => void;
}

const CreateRefundForm = ({ onRefundCreated }: CreateRefundFormProps) => {
  const [customerId, setCustomerId] = useState("");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

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
        const errorData = await response.json();

        throw new Error(errorData.message || "Failed to create refund request");
      }

      await response.json();

      setSuccess("Refund request created successfully.");

      setCustomerId("");
      setOrderId("");
      setMessage("");
      onRefundCreated();
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-4 sm:p-6">
      <h2 className="text-xl font-semibold text-white">
        Create Refund Request
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Submit a new refund request for review.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Customer ID
          </label>

          <input
            type="text"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="Enter customer ID"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">Order ID</label>

          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter order ID"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Refund Reason
          </label>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the reason for the refund..."
            rows={5}
            className="w-full resize-none rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
            required
          />
        </div>

        {success && <p className="text-sm text-green-400">{success}</p>}

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {loading ? "Submitting..." : "Submit Refund Request"}
        </button>
      </form>
    </div>
  );
};

export default CreateRefundForm;
