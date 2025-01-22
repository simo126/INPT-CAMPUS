-- Ensure `room_number` can repeat across buildings but is unique within each building
ALTER TABLE rooms ADD CONSTRAINT unique_room_in_building UNIQUE (room_number, building_id);

-- Ensure valid room types
ALTER TABLE rooms ADD CONSTRAINT valid_room_type CHECK (room_type IN ('SINGLE', 'DOUBLE', 'TRIPLE', 'QUADRUPLE'));

-- Ensure valid maximum capacity values
ALTER TABLE rooms ADD CONSTRAINT valid_max_capacity CHECK (
    (building_id = 2 AND max_capacity IN (1, 2, 3, 4)) OR
    (building_id = 3 AND max_capacity IN (1, 2)) OR
    (building_id = 1 AND max_capacity IN (1, 2))
);
-- Ensure valid gender values
ALTER TABLE students ADD CONSTRAINT valid_gender CHECK (gender IN ('male', 'female'));

-- Ensure valid academic years
ALTER TABLE students ADD CONSTRAINT valid_year CHECK (year IN ('INE1', 'INE2', 'INE3'));
-- Ensure unique room reservations for the same time period
ALTER TABLE reservations ADD CONSTRAINT unique_reservation UNIQUE (room_id, start_date, end_date);

-- Add gender-based room assignment constraint using a trigger
-- Use a trigger-based approach for gender restriction (explained below)
-- Ensure Start Date is Before End Date in reservations
ALTER TABLE reservations ADD CONSTRAINT valid_reservation_dates CHECK (start_date < end_date);
