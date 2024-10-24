import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const userId = useParams().userId;

  const onSelectTrain = async (trainId, date) => {
    try {
      const response = await axios.post(
        "http://localhost:4002/pre-book-ticket",
        {
          trainId: trainId,
          userId: userId,
          date: date,
        }
      );
    } catch (error) {
      console.error("Error booking train:", error);
    }
  };

  useEffect(() => {
    const fetchTrains = async () => {
      const response = await axios.get("http://localhost:4004/trains");
      setTrains(response.data);
    };
    fetchTrains();
  }, []);

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
  };

  const thTdStyle = {
    padding: "10px",
    textAlign: "left",
    border: "1px solid #ddd",
  };

  const thStyle = {
    ...thTdStyle,
    backgroundColor: "#f2f2f2",
  };

  const trHoverStyle = {
    backgroundColor: "#f1f1f1",
  };

  const buttonStyle = {
    padding: "5px 10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };

  return (
    <div>
      <h2>Available Trains</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Train Name</th>
            <th style={thStyle}>Route</th>
            <th style={thStyle}>Fare</th>
            <th style={thStyle}>Total Seats</th>
            <th style={thStyle}>Available Seats</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {trains.map((train) => (
            <tr
              key={train.id}
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  trHoverStyle.backgroundColor)
              }
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
            >
              <td style={thTdStyle}>{train.train_name}</td>
              <td style={thTdStyle}>{train.route}</td>
              <td style={thTdStyle}>{train.fare}</td>
              <td style={thTdStyle}>{train.total_seats}</td>
              <td style={thTdStyle}>{train.available_seats}</td>
              <td style={thTdStyle}>
                <button
                  style={buttonStyle}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      buttonHoverStyle.backgroundColor)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      buttonStyle.backgroundColor)
                  }
                  onClick={() => onSelectTrain(train.id, train.date)}
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainList;
