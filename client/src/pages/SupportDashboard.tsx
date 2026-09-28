import RefundResult from "../components/RefundResult";
import CreateRefundForm from "../components/RefundForm";
import { useState } from "react";

const SupportDashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefundCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };
  return (
    <div className="mx-auto rounded-xl border border-slate-800 bg-slate-950 p-2 text-white md:p-6">
      <h1 className="text-blue-700 md:text-2xl">
        Refund Support Dashboard
      </h1>

      <h2 className="text-blue-400 md:text-lg">
        Review and manage customer refund requests
      </h2>

      <div className="mt-6">
        <CreateRefundForm onRefundCreated={handleRefundCreated}/>
      </div>

      <div className="mt-6">
        <RefundResult key={refreshKey}/>
      </div>
    </div>
  );
};

export default SupportDashboard;