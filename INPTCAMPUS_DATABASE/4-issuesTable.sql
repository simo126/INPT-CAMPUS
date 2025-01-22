-- Create the `issues` table
CREATE TABLE issues (
    id BIGSERIAL PRIMARY KEY,
    room_id BIGINT NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
-- Insert dummy issues for testing
INSERT INTO issues (room_id, description, status) VALUES
((SELECT id FROM rooms WHERE room_number = '101' AND building_id = 1), 'Leaking faucet in the bathroom', 'pending'),
((SELECT id FROM rooms WHERE room_number = '102' AND building_id = 2), 'Heater not working', 'pending'),
((SELECT id FROM rooms WHERE room_number = '101' AND building_id = 3), 'Window latch broken', 'resolved');
