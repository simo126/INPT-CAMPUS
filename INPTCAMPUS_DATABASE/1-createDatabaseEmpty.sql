-- Create the `buildings` table
CREATE TABLE buildings (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create the `fillieres` table
CREATE TABLE fillieres (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- Create the `rooms` table
CREATE TABLE rooms (
    id BIGSERIAL PRIMARY KEY,
    room_number VARCHAR(50) NOT NULL,
    building_id BIGINT NOT NULL,
    floor INT NOT NULL,
    room_type VARCHAR(50) NOT NULL,
    max_capacity INT NOT NULL DEFAULT 2,
    current_occupancy INT NOT NULL DEFAULT 0,
    FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE
);

-- Create the `students` table
CREATE TABLE students (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    filiere_id BIGINT NOT NULL,
    year VARCHAR(5) NOT NULL,
    gender VARCHAR(6) NOT NULL,
    FOREIGN KEY (filiere_id) REFERENCES fillieres(id) ON DELETE CASCADE
);

-- Create the `reservations` table
CREATE TABLE reservations (
    id BIGSERIAL PRIMARY KEY,
    student_id BIGINT NOT NULL,
    room_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE
);
