// src/App.js
import React, { useEffect, useState } from "react";
import axios from 'axios';
import Payment from "./components/PaymentInitiation";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/:userId/:bookingId/payment" element={<Payment />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
