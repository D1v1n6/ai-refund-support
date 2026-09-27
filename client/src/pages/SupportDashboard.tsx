const refundInfo = [
  {
    customer: "John Doe",
    orderId: "12345",
    amount: 200,
    decision: "Approved",
    date: "2024-06-01",
  },
  {
    customer: "Jane Smith",
    orderId: "12346",
    amount: 150,
    decision: "Denied",
    date: "2024-06-02",
  },
  {
    customer: "Alice Johnson",
    orderId: "12347",
    amount: 300,
    decision: "Escalated",
    date: "2024-06-03",
  },
];

const SupportDashboard = () => {
  const totalRefunds = refundInfo.length;
  const approvedRefunds = refundInfo.filter((a) => a.decision === "Approved");
  const deniedRefunds = refundInfo.filter((a) => a.decision === "Denied");
  const escalatedRefunds = refundInfo.filter((a) => a.decision === "Escalated");

  const stats = [
    { label: "Total", value: totalRefunds },
    { label: "Approved", value: approvedRefunds.length },
    { label: "Denied", value: deniedRefunds.length },
    { label: "Escalated", value: escalatedRefunds.length },
  ];
  return (
    <div className="bg-slate-950 text-white gap-4 mx-auto md:p-6 p-2 rounded-xl md:border border-slate-800">
      <h1 className="md:text-2xl text-blue-700">Refund Support Dashboard</h1>
      <h1 className="md:text-lg text-blue-400">
        Review and manage customer refund requests
      </h1>
      <div className="mt-4 flex gap-2 justify-between items-center md:text-3xl">
        {stats.map((s) => (
          <div key={s.label}>
            {s.label}
            <p>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 ">
        <h1 className="md:text-2xl text-blue-400">Refund Requests</h1>
        <div className="grid grid-cols-5 gap-2 md:gap-9 md:text-3xl text-xs">
          <p>Customer</p>
          <p>Order</p>
          <p>Amount</p>
          <p>Decision</p>
          <p>Date</p>
        </div>
        {refundInfo.map((r) => (
          <div className="grid grid-cols-5 gap-2 md:gap-9 md:text-3xl text-xs" key={r.orderId}>
            <p>{r.customer}</p>
            <p>{r.orderId}</p>
            <p>${r.amount}</p>
            <p>{r.decision}</p>
            <p>{r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportDashboard;
