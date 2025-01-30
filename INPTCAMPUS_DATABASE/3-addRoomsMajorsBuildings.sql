INSERT INTO fillieres (name) VALUES
('ASEDS'),
('SESNUM'),
('CLOUD'),
('AMOA'),
('ICCN'),
('SMART'),
('DATA');
INSERT INTO buildings (name) VALUES
('Pavillon 1'),
('Pavillon 2'),
('Pavillon 3');
-- Pavillon 1: 6 floors, 27 rooms per floor, max capacity 2
DO $$ 
DECLARE 
    floor_num INT;
    room_num INT;
BEGIN 
    FOR floor_num IN 1..6 LOOP
        FOR room_num IN 1..27 LOOP
            INSERT INTO rooms (room_number, building_id, floor, room_type, max_capacity, current_occupancy)
            VALUES (CONCAT(floor_num, LPAD(room_num::TEXT, 2, '0')), 1, floor_num, 'DOUBLE', 2, 0);
        END LOOP;
    END LOOP;
END $$;

-- Pavillon 2: 2 floors, 27 rooms per floor, max capacity 4
DO $$ 
DECLARE 
    floor_num INT;
    room_num INT;
BEGIN 
    FOR floor_num IN 1..2 LOOP
        FOR room_num IN 1..27 LOOP
            INSERT INTO rooms (room_number, building_id, floor, room_type, max_capacity, current_occupancy)
            VALUES (CONCAT(floor_num, LPAD(room_num::TEXT, 2, '0')), 2, floor_num, 'QUADRUPLE', 4, 0);
        END LOOP;
    END LOOP;
END $$;

-- Pavillon 3: 4 floors, 27 rooms per floor, max capacity 2
DO $$ 
DECLARE 
    floor_num INT;
    room_num INT;
BEGIN 
    FOR floor_num IN 1..4 LOOP
        FOR room_num IN 1..27 LOOP
            INSERT INTO rooms (room_number, building_id, floor, room_type, max_capacity, current_occupancy)
            VALUES (CONCAT(floor_num, LPAD(room_num::TEXT, 2, '0')), 3, floor_num, 'DOUBLE', 2, 0);
        END LOOP;
    END LOOP;
END $$;
