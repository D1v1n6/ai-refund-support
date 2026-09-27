import {Route, Routes} from "react-router-dom";
import CustomerRefund from "./pages/CustomerRefund";

function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-white md:p-6">
      <Routes>
      <Route path="/" element={<CustomerRefund />} />
    </Routes>
    </div>
    
  );
}

export default App;
  