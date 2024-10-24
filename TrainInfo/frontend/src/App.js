import React, { useState } from 'react';
import TrainList from './components/TrainList';

const App = () => {

  return (
    <div>
      <h1>Available Trains</h1>
      <TrainList />
    </div>
  );
};

export default App;