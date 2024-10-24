// src/App.js
import React, { useEffect, useState } from "react";
import axios from 'axios';
import TicketBooking from "./Components/TicketBooking";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/:userId/:trainId/:date/book" element={<TicketBooking />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
