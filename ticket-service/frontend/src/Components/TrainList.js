import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrainList = ({ onSelectTrain }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchTrains = async () => {
      const response = await axios.get('http://localhost:3050/trains');
      setTrains(response.data);
    };
    fetchTrains();
  }, []);

  return (
    <div>
      <h2>Available Trains</h2>
      <ul>
        {trains.map(train => (
          <li key={train.id} onClick={() => onSelectTrain(train)}>
            {train.name} - {train.route} - {train.fare}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrainList;
