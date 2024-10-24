CREATE TABLE IF NOT EXISTS trains (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        route VARCHAR(100),
        schedule VARCHAR(100),
        seats INT,
        fare NUMERIC
      );

CREATE TABLE IF NOT EXISTS train_schedule (
        id SERIAL PRIMARY KEY,
        train_id INT REFERENCES trains(id),
        date DATE NOT NULL,
        available_seats INT,
        UNIQUE (train_id, date)
      );

      INSERT INTO trains (name, route, schedule, seats, fare) 
VALUES 
('Sundarban Express', 'Dhaka - Khulna', '6:20 AM - 4:00 PM', 150, 550.00),
('Parabat Express', 'Dhaka - Sylhet', '6:35 AM - 1:00 PM', 180, 600.00),
('Mohanagar Express', 'Chittagong - Dhaka', '7:00 AM - 2:30 PM', 200, 650.00),
('Padma Express', 'Rajshahi - Dhaka', '4:00 PM - 9:30 PM', 170, 500.00),
('Upakul Express', 'Dhaka - Noakhali', '3:20 PM - 10:30 PM', 130, 450.00),
('Titumir Express', 'Rajshahi - Chilahati', '7:45 AM - 2:15 PM', 160, 480.00),
('Lalmoni Express', 'Lalmonirhat - Dhaka', '9:45 PM - 7:15 AM', 140, 800.00),
('Subarna Express', 'Dhaka - Chittagong', '4:30 PM - 10:45 PM', 175, 720.00),
('Silk City Express', 'Dhaka - Rajshahi', '2:45 PM - 9:30 PM', 190, 620.00),
('Chitra Express', 'Khulna - Dhaka', '8:30 AM - 6:00 PM', 160, 550.00);



-- Inserting dummy data into the train_schedule table

INSERT INTO train_schedule (train_id, date, available_seats) VALUES
(1, '2024-10-25', 50),  -- For Express 1
(1, '2024-10-26', 45),
(2, '2024-10-25', 30),  -- For Express 2
(2, '2024-10-27', 20),
(3, '2024-10-28', 40),  -- For Express 3
(3, '2024-10-29', 35),
(4, '2024-10-30', 25),  -- For Express 4
(4, '2024-10-31', 15);

