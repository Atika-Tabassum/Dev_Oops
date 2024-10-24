-- Create tables
CREATE TABLE IF NOT EXISTS train_schedule (
    id SERIAL PRIMARY KEY,
    train_id INT,
    date DATE NOT NULL,
    available_seats INT,
    UNIQUE (train_id, date)
);

CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    user_id INT,
    train_id INT,
    seat_number INT,
    date DATE NOT NULL,
    booked_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (train_id, seat_number, date)
);

-- Insert mock data into train_schedule
INSERT INTO train_schedule (train_id, date, available_seats) VALUES
(1, '2024-10-30', 50),
(1, '2024-10-31', 45),
(2, '2024-10-30', 60),
(2, '2024-10-31', 40),
(3, '2024-10-30', 70),
(3, '2024-10-31', 30),
(4, '2024-10-30', 20),
(4, '2024-10-31', 10);

-- Insert mock data into tickets
INSERT INTO tickets (user_id, train_id, seat_number, date) VALUES
(1, 1, 1, '2024-10-30'),
(2, 1, 2, '2024-10-30'),
(1, 2, 3, '2024-10-30'),
(3, 2, 4, '2024-10-31'),
(2, 3, 5, '2024-10-30'),
(4, 4, 6, '2024-10-31');
