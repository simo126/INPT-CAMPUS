--Dummy Data for testing baby kssim
INSERT INTO buildings (name) VALUES
('Pavillon 1'),
('Pavillon 2'),
('Pavillon 3');
INSERT INTO fillieres (name) VALUES
('ASEDS'),
('SESNUM'),
('CLOUD'),
('AMOA'),
('ICCN'),
('SMART'),
('DATA');
-- Pavillon 1 (Building 1)
INSERT INTO rooms (room_number, building_id, floor, room_type, max_capacity, current_occupancy) VALUES
('101', 1, 1, 'DOUBLE', 2, 0),
('102', 1, 1, 'SINGLE', 1, 0);

-- Pavillon 2 (Building 2)
INSERT INTO rooms (room_number, building_id, floor, room_type, max_capacity, current_occupancy) VALUES
('101', 2, 1, 'QUADRUPLE', 4, 0),
('102', 2, 1, 'DOUBLE', 2, 0);

-- Pavillon 3 (Building 3)
INSERT INTO rooms (room_number, building_id, floor, room_type, max_capacity, current_occupancy) VALUES
('101', 3, 1, 'DOUBLE', 2, 0),
('102', 3, 1, 'SINGLE', 1, 0);

INSERT INTO students (name, email, filiere_id, year, gender) VALUES
('Alice Smith', 'alice@example.com', 1, 'INE1', 'female'),
('Bob Johnson', 'bob@example.com', 2, 'INE2', 'male'),
('Charlie Brown', 'charlie@example.com', 3, 'INE3', 'male'),
('Diana Prince', 'diana@example.com', 4, 'INE1', 'female');


-- Valid Reservation: Male in Pavillon 1
INSERT INTO reservations (student_id, room_id, start_date, end_date, status) VALUES
(2, (SELECT id FROM rooms WHERE room_number = '101' AND building_id = 1), '2025-09-01', '2025-12-31', 'ACTIVE');

-- Valid Reservation: Female in Pavillon 3
INSERT INTO reservations (student_id, room_id, start_date, end_date, status) VALUES
(1, (SELECT id FROM rooms WHERE room_number = '101' AND building_id = 3), '2025-09-01', '2025-12-31', 'ACTIVE');
