import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaymentInitiation from "./components/PaymentInitiation";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/:bookingId/payment" element={<PaymentInitiation />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
