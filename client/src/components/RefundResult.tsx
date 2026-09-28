import { useEffect, useState } from "react";
import refundInfoService from "../services/refundInfoService";

interface RefundRequest {
  _id: string;
  customerId: string;
  orderId: string;
  message: string;
  decision: "Approved" | "Denied" | "Escalated";
  refundAmount: number;
  aiClassification: string;
  aiReasoning: string;
  createdAt: string;
  updatedAt: string;
}

const RefundResult = () => {
  const [refunds, setRefunds] = useState<RefundRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [decisionFilter, setDecisionFilter] = useState("All");
  const [selectedRefund, setSelectedRefund] = useState<RefundRequest | null>(
    null,
  );

  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const data = await refundInfoService();
        setRefunds(data);
      } catch (error) {
        setError("Failed to load refund requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRefunds();
  }, []);
  if (loading) {
    return <p>Loading refund requests...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const totalRequests = refunds.length;

  const approvedRequests = refunds.filter(
    (refund) => refund.decision === "Approved",
  ).length;

  const deniedRequests = refunds.filter(
    (refund) => refund.decision === "Denied",
  ).length;

  const pendingRequests = refunds.filter(
    (refund) => refund.decision === "Escalated",
  ).length;

  const totalRefundAmount = refunds.reduce(
    (total, refund) => total + refund.refundAmount,
    0,
  );

  const filteredRefunds = refunds.filter((refund) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      refund._id.toLowerCase().includes(search) ||
      refund.customerId.toLowerCase().includes(search) ||
      refund.orderId.toLowerCase().includes(search) ||
      refund.message.toLowerCase().includes(search);

    const matchesDecision =
      decisionFilter === "All" || refund.decision === decisionFilter;

    return matchesSearch && matchesDecision;
  });

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
          <p className="text-sm text-slate-400">Total Requests</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {totalRequests}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
          <p className="text-sm text-slate-400">Approved</p>
          <p className="mt-2 text-2xl font-semibold text-green-400">
            {approvedRequests}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
          <p className="text-sm text-slate-400">Denied</p>
          <p className="mt-2 text-2xl font-semibold text-red-400">
            {deniedRequests}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
          <p className="text-sm text-slate-400">Pending</p>
          <p className="mt-2 text-2xl font-semibold text-yellow-400">
            {pendingRequests}
          </p>
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
          <p className="text-sm text-slate-400">Total Refunds</p>
          <p className="mt-2 text-2xl font-semibold text-white">
            ₦{totalRefundAmount.toLocaleString()}
          </p>
        </div>
      </div>
      <h1 className="md:text-2xl text-blue-400 mb-4 mt-8">Refund Requests</h1>
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search refunds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-500"
        />

        <select
          value={decisionFilter}
          onChange={(e) => setDecisionFilter(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none"
        >
          <option value="All">All Decisions</option>
          <option value="Approved">Approved</option>
          <option value="Denied">Denied</option>
          <option value="Escalated">Pending</option>
        </select>
      </div>
      {filteredRefunds.map((refund) => (
        <div
          key={refund._id}
          onClick={() => setSelectedRefund(refund)}
          className="cursor-pointer rounded-xl border border-slate-700 bg-slate-800 p-6 transition hover:border-slate-500"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-white">Refund Request</h2>

              <p className="mt-1 text-sm text-slate-400">#{refund._id}</p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                refund.decision === "Approved"
                  ? "bg-green-500/10 text-green-400"
                  : refund.decision === "Denied"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-yellow-500/10 text-yellow-400"
              }`}
            >
              {refund.decision}
            </span>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-slate-400">Customer</p>
              <p className="mt-1 truncate text-white">{refund.customerId}</p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Order</p>
              <p className="mt-1 truncate text-white">{refund.orderId}</p>
            </div>

            <div>
              <p className="text-sm text-slate-400">Refund Amount</p>
              <p className="mt-1 font-medium text-white">
                ₦{refund.refundAmount.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm text-slate-400">Customer Message</p>

            <p className="mt-1 line-clamp-2 text-white">{refund.message}</p>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-700 pt-4">
            <span className="text-sm text-slate-400">
              {new Date(refund.createdAt).toLocaleDateString()}
            </span>

            <span className="text-sm text-blue-400">View details →</span>
          </div>
        </div>
      ))}
      {selectedRefund && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/50"
          onClick={() => setSelectedRefund(null)}
        >
          <div
            className="h-full w-full max-w-lg overflow-y-auto bg-slate-900 p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  Refund Details
                </h2>

                <p className="text-sm text-slate-400">#{selectedRefund._id}</p>
              </div>

              <button
                onClick={() => setSelectedRefund(null)}
                className="text-2xl text-slate-400 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-slate-400">Decision</p>
                <p className="mt-1 text-white">{selectedRefund.decision}</p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Refund Amount</p>
                <p className="mt-1 text-xl font-semibold text-white">
                  ₦{selectedRefund.refundAmount.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Customer ID</p>
                <p className="mt-1 break-all text-white">
                  {selectedRefund.customerId}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Order ID</p>
                <p className="mt-1 break-all text-white">
                  {selectedRefund.orderId}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Customer Message</p>
                <p className="mt-1 leading-6 text-white">
                  {selectedRefund.message}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">AI Classification</p>
                <p className="mt-1 text-white">
                  {selectedRefund.aiClassification}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">AI Reasoning</p>
                <p className="mt-1 leading-6 text-slate-300">
                  {selectedRefund.aiReasoning}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-400">Submitted</p>
                <p className="mt-1 text-white">
                  {new Date(selectedRefund.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundResult;
