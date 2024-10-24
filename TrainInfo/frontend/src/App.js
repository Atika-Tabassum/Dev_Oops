import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TrainList from "./components/TrainList";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/:userId/trains" element={<TrainList />} />{" "}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
